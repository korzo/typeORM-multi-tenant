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
var TenantService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const tenant_entity_1 = require("./entities/tenant.entity");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let TenantService = TenantService_1 = class TenantService {
    constructor(moduleRef, configService, httpService) {
        this.moduleRef = moduleRef;
        this.configService = configService;
        this.httpService = httpService;
        this.logger = new common_1.Logger(TenantService_1.name);
    }
    async loadEntityManager(tenant) {
        try {
            return this.moduleRef.get((0, typeorm_1.getEntityManagerToken)(`${tenant}`), {
                strict: false
            });
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `The tenant ${tenant} not found.`,
                error: 'BAD_REQUEST',
                trace: error.message || null
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async AllTenantAlias() {
        const prefix = [];
        const tenantconfig = `https://${this.loadEnv()}.mdoc.app/api/tenantconfig/v1/public/tenant`;
        const token = `Bearer ${(await this.mDocToken()).data}`;
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(tenantconfig, { headers: { Authorization: token } }));
            for (const uuid of data) {
                const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${tenantconfig}/${uuid}`, { headers: { Authorization: token } }));
                prefix.push(data.alias);
            }
            return prefix;
        }
        catch (error) {
            throw new common_1.HttpException({
                message: `A failure to the access this url: https://${this.loadEnv()}.mdoc.app/api/tenantconfig/v1/public/tenant`,
                statusText: error.response.statusText,
                statusCode: error.response.status
            }, error.response.status);
        }
    }
    loadEnv() {
        try {
            process.env.ENV = this.configService.get('MDOC_HOST').split('/').pop().split('.').shift();
            return process.env.ENV;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Configuration not found`);
        }
    }
    async findOne(id, tenant) {
        const entityManager = await this.loadEntityManager(tenant);
        if (!entityManager)
            throw new common_1.NotFoundException('Tenant not found');
        const select = await entityManager.findOne(tenant_entity_1.Tenant, { where: { service: id } });
        if (!select)
            throw new common_1.BadRequestException('Configuration not found');
        return select;
    }
    async create(payload, tenant) {
        const entityManager = await this.loadEntityManager(tenant);
        const select = await entityManager.findOne(tenant_entity_1.Tenant, { where: { service: payload.service } });
        if (select !== null)
            throw new common_1.NotAcceptableException(`The configuration already created`);
        await entityManager.insert(tenant_entity_1.Tenant, { service: payload.service, cfg: payload.cfg, backup: payload.cfg });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Create Successful'
        };
    }
    async update(id, tenant, payload) {
        const entityManager = await this.loadEntityManager(tenant);
        if (!entityManager)
            throw new common_1.NotFoundException('Tenant not found');
        const select = await entityManager.findOne(tenant_entity_1.Tenant, { where: { service: id } });
        if (select === null)
            throw new common_1.BadRequestException(`Configuration not found`);
        if (select.cfg === payload.cfg)
            throw new common_1.NotAcceptableException(`The configuration that was sent is the same with the configuration that is configured`);
        await entityManager.update(tenant_entity_1.Tenant, { service: id }, { cfg: payload.cfg, backup: select.cfg });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Update Successful'
        };
    }
    async recoverytoTheLastBackup(id, tenant) {
        const entityManager = await this.loadEntityManager(tenant);
        if (!entityManager)
            throw new common_1.NotFoundException('Tenant not found');
        const select = await entityManager.findOne(tenant_entity_1.Tenant, { where: { service: id } });
        if (select === null)
            throw new common_1.BadRequestException(`Configuration not found`);
        if (select.cfg !== select.backup)
            await entityManager.update(tenant_entity_1.Tenant, { service: id }, { cfg: select.backup, backup: select.cfg });
        if (select.cfg === select.backup)
            throw new common_1.NotAcceptableException(`The configuration that is in backup is the same one being used`);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Update Successful'
        };
    }
    async mDocToken() {
        return (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://${this.configService.get('ENV')}.mdoc.app/api/authorization/v2/auth/token`, {
            client_id: 'mirth.interoperability',
            client_secret: 'PQS6SnfRY7XHEo2UzKQKfT4lyOhgHQwW',
            grant_type: 'client_credentials'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }));
    }
};
TenantService = TenantService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef,
        config_1.ConfigService,
        axios_1.HttpService])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map