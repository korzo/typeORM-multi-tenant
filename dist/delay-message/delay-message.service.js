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
exports.DelayMessageService = void 0;
const common_1 = require("@nestjs/common");
const delay_message_entity_1 = require("./entities/delay-message.entity");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
let DelayMessageService = class DelayMessageService {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    async loadEntityManager(tenant) {
        try {
            return this.moduleRef.get((0, typeorm_1.getEntityManagerToken)(tenant), {
                strict: false
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`The tenant ${tenant} not found`);
        }
    }
    async findAll(tenant) {
        const entityManager = await this.loadEntityManager(tenant);
        if (!entityManager) {
            throw new common_1.NotFoundException('Tenant not found');
        }
        return entityManager.find(delay_message_entity_1.DelayMessage, { take: 1000 });
    }
    create(createDelayMessageDto) {
        return 'This action adds a new delayMessage';
    }
    findOne(id) {
        return `This action returns a #${id} delayMessage`;
    }
    update(id, updateDelayMessageDto) {
        return `This action updates a #${id} delayMessage`;
    }
    remove(id) {
        return `This action removes a #${id} delayMessage`;
    }
};
DelayMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], DelayMessageService);
exports.DelayMessageService = DelayMessageService;
//# sourceMappingURL=delay-message.service.js.map