import { Module } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { TenantController } from './tenant.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
 controllers: [TenantController],
 providers: [TenantService],
 imports: [
  HttpModule.register({
   timeout: 5000,
   maxRedirects: 5
  })
 ]
})
export class TenantModule {}
