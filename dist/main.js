"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const app_initializer_1 = require("./common/app.initializer");
let port = null;
async function App() {
    await app_initializer_1.AppInitializer.prototype.load();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const configService = app.get(config_1.ConfigService);
    const base_path = configService.get('CONTEXT_PATH').concat('/api');
    port = configService.get('APP_PORT') || 3000;
    app.setGlobalPrefix(base_path);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mirth Connect')
        .setDescription('Microservice of Mirth Connect')
        .setVersion(configService.get('npm_package_version'))
        .addServer(configService.get('MDOC_HOST'), 'Environment')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
    }, 'jwt-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(`${base_path}/docs`, app, document);
    await app.listen(port, '::');
}
App()
    .then(() => console.info(`🚀 Application is running on Port: ${port}`))
    .catch((e) => console.error(`Start failed. ${e}`));
//# sourceMappingURL=main.js.map