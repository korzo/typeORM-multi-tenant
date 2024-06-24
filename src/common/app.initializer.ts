import { multiCaching } from 'cache-manager';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EntityManager, createConnection } from 'typeorm';
import type { DbConfig } from '../module-factory';

export interface Tenant {
  id: string;
  deleted: boolean;
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
  name: string;
  description: string;
  alias: string;
  admin: string;
  timezone: any;
  language: any;
}

export interface TenantConfiguration {
  id: string;
  deleted: boolean;
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
  id_tenant: string;
  description: string;
  id_config_type_database: string;
  id_config_type_style: string;
  id_config_type_integration: any;
  id_config_type_other: any;
  is_active: boolean;
}

export interface configurationItem {
  id: string;
  deleted: boolean;
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
  id_config_type: string;
  description: string;
  key: string;
  value: string;
}

// const multiCache = multiCaching(['url', ]);
// const userId2 = 456;
// const key2 = 'user_' + userId;
// const ttl = 5;

@Injectable()
export class AppInitializer {
  private logger = new Logger(AppInitializer.name);

  constructor() {}

  async load() {
    const url = process.env.DB_DATASOURCE_URL.split('//');
    const user = process.env.DB_MIRTH_USER;
    const pass = process.env.DB_MIRTH_PASS;
    process.env.DB_DATASOURCE_URL = url[0]
      .concat('//')
      .concat(user + ':' + pass + '@')
      .concat(url[1]);
    await AppInitializer.configurationDatabaseTenants();
    console.info('String of Connection load successfull');
  }

  static async configurationDatabaseTenants(): Promise<DbConfig[]> {
    const cfg = [];
    const prefix = [];
    let connection = null;
    const configs: DbConfig[] = [];
    try {
      connection = await createConnection({
        url: 'postgresql://root:root@master.database.vpc.private:5432/mdoc_authentication',
        name: 'master',
        type: 'postgres',
        logging: true,
      });
      const list: Tenant[] = await connection.query('SELECT * FROM tcf.tenant');

      for (const tenant of list) {
        let databaseSchemaConnection = {};
        let user: string = null;
        let pass: string = null;
        let url: any = null;

        let tenantConfiguration: TenantConfiguration[] = await connection.query(
          `SELECT * FROM tcf.tenant_configuration where id_tenant = '${tenant.id}'`,
        );
        let configurationItem: configurationItem[] = await connection.query(
          `SELECT * FROM tcf.configuration_item where id_config_type = '${tenantConfiguration[0].id_config_type_database}'`,
        );

        databaseSchemaConnection['prefix'] = tenant.alias;
        prefix.push(tenant.alias);

        configurationItem.forEach((cfg: configurationItem) => {
          if (cfg.key === 'username') {
            databaseSchemaConnection['username'] = cfg.value;
            user = cfg.value;
          }

          if (cfg.key === 'password') {
            databaseSchemaConnection['password'] = cfg.value;
            pass = cfg.value;
          }

          if (cfg.key === 'url' && url === null) {
            url = cfg.value
              .substring(5, cfg.value.length)
              .split(/(?<!\/)\/(?!\/)/)[0]
              .concat('/nextgenconnect')
              .split('//');
          }
        });

        url = url[0]
          .concat('//')
          .concat(user + ':' + pass + '@')
          .concat(url[1]);
        process.env[tenant.alias] = url;
        databaseSchemaConnection['url'] = url;
        configs.push({ name: tenant.alias, url });

        console.info('URL', process.env[tenant.alias]);

        cfg.push(databaseSchemaConnection);
      }

      process.env['CUSTOMER_PREFIX'] = prefix.toString();
      console.info(process.env['CUSTOMER_PREFIX']);
      console.info('CFG', JSON.stringify(cfg));
    } catch (e) {
      throw new Error(e);
    } finally {
      if (connection) await connection.close();
    }

    return configs;
  }
}
