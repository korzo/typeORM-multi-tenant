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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppAfterInitializer = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AppAfterInitializer = class AppAfterInitializer {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async onModuleInit() {
        const test = await this.configurationDatabaseTenants();
        console.log('Aplicação inicializada com sucesso!');
    }
    async configurationDatabaseTenants() {
        const cfg = [];
        const prefix = [];
        const list = await this.entityManager.query('SELECT * FROM tcf.tenant');
        for (const tenant of list) {
            let databaseSchemaConnection = {};
            let user = null;
            let pass = null;
            let url = null;
            let tenantConfiguration = await this.entityManager.query(`SELECT * FROM tcf.tenant_configuration where id_tenant = '${tenant.id}'`);
            let configurationItem = await this.entityManager.query(`SELECT * FROM tcf.configuration_item where id_config_type = '${tenantConfiguration[0].id_config_type_database}'`);
            databaseSchemaConnection['name'] = tenant.alias;
            prefix.push(tenant.alias);
            configurationItem.forEach((cfg) => {
                if (cfg.key === 'username')
                    user = cfg.value;
                if (cfg.key === 'password')
                    pass = cfg.value;
                if (cfg.key === 'url') { }
                url = cfg.value.substring(5, cfg.value.length).split(/(?<!\/)\/(?!\/)/)[0].concat('/nextgenconnect').split('//');
            });
            url = url[0].concat('//').concat(user + ':' + pass + '@').concat(url[1]);
            process.env[tenant.alias] = url;
            databaseSchemaConnection['url'] = url;
            cfg.push(databaseSchemaConnection);
        }
        process.env.CUSTOMER_PREFIX = prefix.toString();
    }
};
AppAfterInitializer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], AppAfterInitializer);
exports.AppAfterInitializer = AppAfterInitializer;
//# sourceMappingURL=app.after.initializer.js.map