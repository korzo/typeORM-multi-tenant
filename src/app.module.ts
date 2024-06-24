import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TenantModule } from './tenant/tenant.module'
import { DelayMessageModule } from './delay-message/delay-message.module'
import ormConfig, { getDatabaseSystemIds } from './common/orm.config'
import { TypeOrmModule } from '@nestjs/typeorm'

const databasesConfig = getDatabaseSystemIds().map((systemId) => {
 return TypeOrmModule.forRootAsync({
  name: `${systemId}`,
  imports: [ConfigModule.forFeature(ormConfig)],
  useFactory: (config: ConfigService) => config.get(`orm.${systemId}`),
  inject: [ConfigService]
 })
})

@Module({
 imports: [
  UserModule,
  AuthModule,
  DelayMessageModule,
  TenantModule,
  ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ...databasesConfig
 ],
 controllers: [AppController],
 providers: [AppService, Logger]
})
export class AppModule {}
