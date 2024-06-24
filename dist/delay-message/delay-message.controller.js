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
exports.DelayMessageController = void 0;
const common_1 = require("@nestjs/common");
const delay_message_service_1 = require("./delay-message.service");
const create_delay_message_dto_1 = require("./dto/create-delay-message.dto");
const update_delay_message_dto_1 = require("./dto/update-delay-message.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let DelayMessageController = class DelayMessageController {
    constructor(delayMessageService) {
        this.delayMessageService = delayMessageService;
    }
    async findAll(tenant) {
        return this.delayMessageService.findAll(tenant);
    }
    create(createDelayMessageDto) {
        return this.delayMessageService.create(createDelayMessageDto);
    }
    findOne(id) {
        return this.delayMessageService.findOne(+id);
    }
    update(id, updateDelayMessageDto) {
        return this.delayMessageService.update(+id, updateDelayMessageDto);
    }
    remove(id) {
        return this.delayMessageService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(':tenant'),
    (0, swagger_1.ApiParam)({ name: 'tenant', description: 'Tenant that you need retrieve the data' }),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve the last 100 message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ok' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    __param(0, (0, common_1.Param)('tenant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DelayMessageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiExcludeEndpoint)(true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_delay_message_dto_1.CreateDelayMessageDto]),
    __metadata("design:returntype", void 0)
], DelayMessageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiExcludeEndpoint)(true),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DelayMessageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiExcludeEndpoint)(true),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_delay_message_dto_1.UpdateDelayMessageDto]),
    __metadata("design:returntype", void 0)
], DelayMessageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiExcludeEndpoint)(true),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DelayMessageController.prototype, "remove", null);
DelayMessageController = __decorate([
    (0, swagger_1.ApiTags)('Delay Message'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiSecurity)('jwt-token'),
    (0, common_1.Controller)('v1/delay-message/'),
    __metadata("design:paramtypes", [delay_message_service_1.DelayMessageService])
], DelayMessageController);
exports.DelayMessageController = DelayMessageController;
//# sourceMappingURL=delay-message.controller.js.map