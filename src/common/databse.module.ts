import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
 imports: [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    url: 'postgresql://root:root@master.database.vpc.private:5432/mdoc_authentication',
    name: 'master',
    type: 'postgres',
    logging: true
  }),
 ],
 // imports: [
 //  ConfigModule.forRoot(),
 //  TypeOrmModule.forRootAsync({
 //   imports: [ConfigModule],
 //   useFactory: (configService: ConfigService) => ({
 //    url: configService.get<string>('DB_DATASOURCE_URL'),
 //    type: 'postgres',
 //    logging: true
 //   }),
 //   inject: [ConfigService],
 //  }),
 // ],
})

export class DatabaseModule { }