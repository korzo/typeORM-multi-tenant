import {
 BadRequestException,
 HttpException,
 HttpStatus,
 Injectable,
 Logger,
 NotAcceptableException,
 NotFoundException
} from '@nestjs/common'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'
import { EntityManager } from 'typeorm'
import { Tenant } from './entities/tenant.entity'
import { getEntityManagerToken } from '@nestjs/typeorm'
import { ModuleRef } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'

@Injectable()
export class TenantService {
 private readonly logger = new Logger(TenantService.name)

 constructor(
  private moduleRef: ModuleRef,
  private readonly configService: ConfigService,
  private readonly httpService: HttpService
 ) {}

 private async loadEntityManager(tenant: string): Promise<EntityManager> {
  try {
   return this.moduleRef.get(getEntityManagerToken(`${tenant}`), {
    strict: false
   })
  } catch (error) {
   throw new HttpException(
    {
     statusCode: HttpStatus.BAD_REQUEST,
     message: `The tenant ${tenant} not found.`,
     error: 'BAD_REQUEST',
     trace: error.message || null
    },
    HttpStatus.BAD_REQUEST
   )
  }
 }

 async AllTenantAlias(): Promise<any[]> {
  const prefix = []
  const tenantconfig = `https://${this.loadEnv()}.mdoc.app/api/tenantconfig/v1/public/tenant`
  const token = `Bearer ${(await this.mDocToken()).data}`

  try {
   const { data } = await firstValueFrom(this.httpService.get(tenantconfig, { headers: { Authorization: token } }))

   for (const uuid of data) {
    const { data } = await firstValueFrom(
     this.httpService.get(`${tenantconfig}/${uuid}`, { headers: { Authorization: token } })
    )
    prefix.push(data.alias)
   }

   return prefix
  } catch (error) {
   throw new HttpException(
    {
     message: `A failure to the access this url: https://${this.loadEnv()}.mdoc.app/api/tenantconfig/v1/public/tenant`,
     statusText: error.response.statusText,
     statusCode: error.response.status
    },
    error.response.status
   )
  }
 }

 loadEnv() {
  try {
   process.env.ENV = this.configService.get<string>('MDOC_HOST').split('/').pop().split('.').shift()
   return process.env.ENV
  } catch (error) {
   throw new BadRequestException(`Configuration not found`)
  }
 }

 async findOne(id: string, tenant: string): Promise<Tenant> {
  const entityManager = await this.loadEntityManager(tenant)

  if (!entityManager) throw new NotFoundException('Tenant not found')

  const select = await entityManager.findOne(Tenant, { where: { service: id } })

  if (!select) throw new BadRequestException('Configuration not found')

  return select
 }

 async create(payload: CreateTenantDto, tenant: string): Promise<Tenant | any> {
  const entityManager = await this.loadEntityManager(tenant)

  const select = await entityManager.findOne(Tenant, { where: { service: payload.service } })

  if (select !== null) throw new NotAcceptableException(`The configuration already created`)

  await entityManager.insert(Tenant, { service: payload.service, cfg: payload.cfg, backup: payload.cfg })

  return {
   statusCode: HttpStatus.CREATED,
   message: 'Create Successful'
  }
 }

 async update(id: string, tenant: string, payload: UpdateTenantDto): Promise<Tenant | any> {
  const entityManager = await this.loadEntityManager(tenant)

  if (!entityManager) throw new NotFoundException('Tenant not found')

  const select = await entityManager.findOne(Tenant, { where: { service: id } })

  if (select === null) throw new BadRequestException(`Configuration not found`)

  if (select.cfg === payload.cfg)
   throw new NotAcceptableException(
    `The configuration that was sent is the same with the configuration that is configured`
   )

  await entityManager.update(Tenant, { service: id }, { cfg: payload.cfg, backup: select.cfg })

  return {
   statusCode: HttpStatus.CREATED,
   message: 'Update Successful'
  }
 }

 async recoverytoTheLastBackup(id: string, tenant: string): Promise<Tenant | any> {
  const entityManager = await this.loadEntityManager(tenant)

  if (!entityManager) throw new NotFoundException('Tenant not found')

  const select = await entityManager.findOne(Tenant, { where: { service: id } })

  if (select === null) throw new BadRequestException(`Configuration not found`)

  if (select.cfg !== select.backup)
   await entityManager.update(Tenant, { service: id }, { cfg: select.backup, backup: select.cfg })

  if (select.cfg === select.backup)
   throw new NotAcceptableException(
    `The configuration that is in backup is the same one being used`
   )

  return {
   statusCode: HttpStatus.CREATED,
   message: 'Update Successful'
  }
 }

 async mDocToken(): Promise<AxiosResponse> {
  return firstValueFrom(
   this.httpService.post(
    `https://${this.configService.get<string>('ENV')}.mdoc.app/api/authorization/v2/auth/token`,
    {
     client_id: 'mirth.interoperability',
     client_secret: 'PQS6SnfRY7XHEo2UzKQKfT4lyOhgHQwW',
     grant_type: 'client_credentials'
    },
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   )
  )
 }
}
