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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppService = AppService_1 = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    version() {
        return this.configService.get('npm_package_version');
    }
    ping() {
        this.logger.log('The test of ping is working...');
        return {
            timestamp: new Date().toISOString(),
            text: 'pong'
        };
    }
};
AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map