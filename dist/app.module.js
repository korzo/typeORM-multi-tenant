"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const tenant_module_1 = require("./tenant/tenant.module");
const delay_message_module_1 = require("./delay-message/delay-message.module");
const orm_config_1 = require("./common/orm.config");
const typeorm_1 = require("@nestjs/typeorm");
const databasesConfig = (0, orm_config_1.getDatabaseSystemIds)().map((systemId) => {
    return typeorm_1.TypeOrmModule.forRootAsync({
        name: `${systemId}`,
        imports: [config_1.ConfigModule.forFeature(orm_config_1.default)],
        useFactory: (config) => config.get(`orm.${systemId}`),
        inject: [config_1.ConfigService]
    });
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            delay_message_module_1.DelayMessageModule,
            tenant_module_1.TenantModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, cache: true }),
            ...databasesConfig
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_1.Logger]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map