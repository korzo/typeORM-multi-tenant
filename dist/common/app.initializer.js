"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppInitializer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInitializer = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AppInitializer = AppInitializer_1 = class AppInitializer {
    constructor() {
        this.logger = new common_1.Logger(AppInitializer_1.name);
    }
    async load() {
        const url = process.env.DB_DATASOURCE_URL.split('//');
        const user = process.env.DB_MIRTH_USER;
        const pass = process.env.DB_MIRTH_PASS;
        process.env.DB_DATASOURCE_URL = url[0].concat('//').concat(user + ':' + pass + '@').concat(url[1]);
        await this.configurationDatabaseTenants();
        console.info('String of Connection load successfull');
    }
    async configurationDatabaseTenants() {
        const cfg = [];
        const prefix = [];
        let connection = null;
        try {
            connection = await (0, typeorm_1.createConnection)({
                url: 'postgresql://root:root@master.database.vpc.private:5432/mdoc_authentication',
                name: 'master',
                type: 'postgres',
                logging: true
            });
            const list = await connection.query('SELECT * FROM tcf.tenant');
            for (const tenant of list) {
                let databaseSchemaConnection = {};
                let user = null;
                let pass = null;
                let url = null;
                let tenantConfiguration = await connection.query(`SELECT * FROM tcf.tenant_configuration where id_tenant = '${tenant.id}'`);
                let configurationItem = await connection.query(`SELECT * FROM tcf.configuration_item where id_config_type = '${tenantConfiguration[0].id_config_type_database}'`);
                databaseSchemaConnection['prefix'] = tenant.alias;
                prefix.push(tenant.alias);
                configurationItem.forEach((cfg) => {
                    if (cfg.key === 'username') {
                        databaseSchemaConnection['username'] = cfg.value;
                        user = cfg.value;
                    }
                    if (cfg.key === 'password') {
                        databaseSchemaConnection['password'] = cfg.value;
                        pass = cfg.value;
                    }
                    if (cfg.key === 'url' && url === null) {
                        url = cfg.value.substring(5, cfg.value.length).split(/(?<!\/)\/(?!\/)/)[0].concat('/nextgenconnect').split('//');
                    }
                });
                url = url[0].concat('//').concat(user + ':' + pass + '@').concat(url[1]);
                process.env[tenant.alias] = url;
                databaseSchemaConnection['url'] = url;
                console.info('URL', process.env[tenant.alias]);
                cfg.push(databaseSchemaConnection);
            }
            process.env['CUSTOMER_PREFIX'] = prefix.toString();
            console.info(process.env['CUSTOMER_PREFIX']);
            console.info('CFG', JSON.stringify(cfg));
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            if (connection)
                await connection.close();
        }
    }
};
AppInitializer = AppInitializer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppInitializer);
exports.AppInitializer = AppInitializer;
//# sourceMappingURL=app.initializer.js.map