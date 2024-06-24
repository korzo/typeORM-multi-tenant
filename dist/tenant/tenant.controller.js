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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("./tenant.service");
const create_tenant_dto_1 = require("./dto/create-tenant.dto");
const update_tenant_dto_1 = require("./dto/update-tenant.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TenantController = class TenantController {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    storeTenants() {
        return this.tenantService.AllTenantAlias();
    }
    loadEnv() {
        return this.tenantService.loadEnv();
    }
    findOne(tenant, id) {
        return this.tenantService.findOne(id, tenant);
    }
    create(payload, tenant) {
        return this.tenantService.create(payload, tenant);
    }
    update(tenant, id, payload) {
        return this.tenantService.update(id, tenant, payload);
    }
    recoverytoTheLastBackup(tenant, id) {
        return this.tenantService.recoverytoTheLastBackup(id, tenant);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Loaded all tenants setup on Application' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ok' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "storeTenants", null);
__decorate([
    (0, common_1.Get)('environment'),
    (0, swagger_1.ApiOperation)({ summary: 'Loaded Environment setup on Application' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ok' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "loadEnv", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':tenant/:id'),
    (0, swagger_1.ApiParam)({ name: 'tenant', description: 'Tenant that you need retrieve the data' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The name of Service' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get the configuration of Tenant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ok' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Configuration not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 406, description: 'Not Acceptable' }),
    __param(0, (0, common_1.Param)('tenant')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':tenant'),
    (0, swagger_1.ApiParam)({ name: 'tenant', description: 'Tenant that you need retrieve the data' }),
    (0, swagger_1.ApiOperation)({ summary: 'Create a configuration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Create Successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 406, description: 'Not Acceptable' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('tenant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_dto_1.CreateTenantDto, String]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':tenant/:id'),
    (0, swagger_1.ApiParam)({ name: 'tenant', description: 'Tenant that you need retrieve the data' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'serviceName' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update a configuration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 406, description: 'Not Acceptable' }),
    __param(0, (0, common_1.Param)('tenant')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_tenant_dto_1.UpdateTenantDto]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':tenant/:id/backup'),
    (0, swagger_1.ApiParam)({ name: 'tenant', description: 'Prefix of tenant' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'serviceName' }),
    (0, swagger_1.ApiOperation)({ summary: 'Recovery to the last backup' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 406, description: 'Not Acceptable' }),
    __param(0, (0, common_1.Param)('tenant')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "recoverytoTheLastBackup", null);
TenantController = __decorate([
    (0, swagger_1.ApiTags)('Tenant'),
    (0, common_1.Controller)('v1/tenant'),
    (0, swagger_1.ApiSecurity)('jwt-token'),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], TenantController);
exports.TenantController = TenantController;
//# sourceMappingURL=tenant.controller.js.map