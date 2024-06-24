"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseSystemIds = void 0;
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
const delay_message_entity_1 = require("../delay-message/entities/delay-message.entity");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
dotenv.config();
const configService = new config_1.ConfigService();
const getDatabaseSystemIds = () => {
    return String(configService.get('CUSTOMER_PREFIX')).split(',');
};
exports.getDatabaseSystemIds = getDatabaseSystemIds;
exports.default = (0, config_1.registerAs)('orm', async () => {
    const config = {};
    (0, exports.getDatabaseSystemIds)().forEach((systemId) => {
        console.info(`${systemId}.database.vpc.private`);
        config[systemId] = {
            type: 'postgres',
            url: process.env[systemId],
            entities: [tenant_entity_1.Tenant, delay_message_entity_1.DelayMessage],
            synchronize: true,
            logging: 'all',
            retryAttempts: 9999,
            extra: {
                connectionTimeoutMillis: 20000,
                idleTimeoutMillis: 1500
            }
        };
    });
    return config;
});
//# sourceMappingURL=orm.config.js.map