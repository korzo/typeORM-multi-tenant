import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common'
import { EntityManager } from "typeorm"

export interface Tenant {
 id: string
 deleted: boolean
 created_by: string
 created_date: string
 updated_by: string
 updated_date: string
 name: string
 description: string
 alias: string
 admin: string
 timezone: any
 language: any
}

export interface TenantConfiguration {
 id: string
 deleted: boolean
 created_by: string
 created_date: string
 updated_by: string
 updated_date: string
 id_tenant: string
 description: string
 id_config_type_database: string
 id_config_type_style: string
 id_config_type_integration: any
 id_config_type_other: any
 is_active: boolean
}

export interface configurationItem {
 id: string
 deleted: boolean
 created_by: string
 created_date: string
 updated_by: string
 updated_date: string
 id_config_type: string
 description: string
 key: string
 value: string
}

@Injectable()
export class AppAfterInitializer implements OnModuleInit {
 constructor(private readonly entityManager: EntityManager) { }

 async onModuleInit() {
  const test = await this.configurationDatabaseTenants();
  console.log('Aplicação inicializada com sucesso!');
 }

 private async configurationDatabaseTenants() {
  const cfg = []
  const prefix = []
  const list: Tenant[] = await this.entityManager.query('SELECT * FROM tcf.tenant')

  for (const tenant of list) {
   let databaseSchemaConnection = {}
   let user: string = null
   let pass: string = null
   let url: any = null

   let tenantConfiguration: TenantConfiguration[] = await this.entityManager.query(`SELECT * FROM tcf.tenant_configuration where id_tenant = '${tenant.id}'`)
   let configurationItem: configurationItem[] = await this.entityManager.query(`SELECT * FROM tcf.configuration_item where id_config_type = '${tenantConfiguration[0].id_config_type_database}'`)

   databaseSchemaConnection['name'] = tenant.alias
   prefix.push(tenant.alias)

   configurationItem.forEach((cfg: configurationItem)  => {
    if (cfg.key === 'username') 
     user = cfg.value

    if (cfg.key === 'password')
     pass = cfg.value

    if (cfg.key === 'url') {}
     url = cfg.value.substring(5, cfg.value.length).split(/(?<!\/)\/(?!\/)/)[0].concat('/nextgenconnect').split('//')
   })

   url = url[0].concat('//').concat(user + ':' + pass + '@').concat(url[1])

   process.env[tenant.alias] = url
   databaseSchemaConnection['url'] = url
   cfg.push(databaseSchemaConnection)
  }
  process.env.CUSTOMER_PREFIX = prefix.toString()
 }
}