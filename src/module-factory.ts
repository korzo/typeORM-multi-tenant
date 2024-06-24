import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DelayMessageModule } from './delay-message/delay-message.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelayMessage } from './delay-message/entities/delay-message.entity';
import { Tenant } from './tenant/entities/tenant.entity';

export type DbConfig = {
  name: string;
  url: string;
};

export const appModuleFactory = (urls: DbConfig[]): any => {
  @Module({
    imports: [
      UserModule,
      AuthModule,
      DelayMessageModule,
      TenantModule,
      ConfigModule.forRoot({ isGlobal: true, cache: true }),
      ...urls.map((e) =>
        TypeOrmModule.forRoot({
          type: 'postgres',
          name: e.name,
          url: e.url,
          entities: [Tenant, DelayMessage],
          logging: 'all',
          retryAttempts: 9999,
          extra: {
            connectionTimeoutMillis: 20000,
            idleTimeoutMillis: 1500,
          },
        }),
      ),
    ],
    controllers: [AppController],
    providers: [AppService, Logger],
  })
  class AppModule {}

  return AppModule;
};
