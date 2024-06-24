import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppInitializer } from './common/app.initializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import orm, { getDatabaseSystemIds } from './common/orm.config';
import { appModuleFactory } from './module-factory';

let port = null;

async function App() {
  //Loading variables to connect to the database
  // await AppInitializer.prototype.load()
  const configs = await AppInitializer.configurationDatabaseTenants();

  //  const app = await NestFactory.create(AppModule, { cors: true })
  const app = await NestFactory.create(appModuleFactory(configs), {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const base_path = configService.get<string>('CONTEXT_PATH').concat('/api');
  port = configService.get<number>('APP_PORT') || 3000;

  app.setGlobalPrefix(base_path);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mirth Connect')
    .setDescription('Microservice of Mirth Connect')
    .setVersion(configService.get('npm_package_version'))
    .addServer(configService.get<string>('MDOC_HOST'), 'Environment')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${base_path}/docs`, app, document);

  await app.listen(port, '::');
}

App()
  .then(() => console.info(`🚀 Application is running on Port: ${port}`))
  .catch((e) => console.error(`Start failed. ${e}`));
