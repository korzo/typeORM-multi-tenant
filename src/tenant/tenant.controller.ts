import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'
import { ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Tenant')
@Controller('v1/tenant')
@ApiSecurity('jwt-token')
export class TenantController {
 constructor(private readonly tenantService: TenantService) {}

 @Get()
 @ApiOperation({ summary: 'Loaded all tenants setup on Application' })
 @ApiResponse({ status: 200, description: 'Ok' })
 storeTenants() {
  return this.tenantService.AllTenantAlias()
 }

 @Get('environment')
 @ApiOperation({ summary: 'Loaded Environment setup on Application' })
 @ApiResponse({ status: 200, description: 'Ok' })
 loadEnv() {
  return this.tenantService.loadEnv()
 }

 @UseGuards(JwtAuthGuard)
 @Get(':tenant/:id')
 @ApiParam({ name: 'tenant', description: 'Tenant that you need retrieve the data' })
 @ApiParam({ name: 'id', description: 'The name of Service' })
 @ApiOperation({ summary: 'Get the configuration of Tenant' })
 @ApiResponse({ status: 200, description: 'Ok' })
 @ApiResponse({ status: 400, description: 'Configuration not found' })
 @ApiResponse({ status: 401, description: 'Unauthorized' })
 @ApiResponse({ status: 406, description: 'Not Acceptable' })
 findOne(@Param('tenant') tenant: string, @Param('id') id: string) {
  return this.tenantService.findOne(id, tenant)
 }

 @UseGuards(JwtAuthGuard)
 @Post(':tenant')
 @ApiParam({ name: 'tenant', description: 'Tenant that you need retrieve the data' })
 @ApiOperation({ summary: 'Create a configuration' })
 @ApiResponse({ status: 201, description: 'Create Successful' })
 @ApiResponse({ status: 401, description: 'Unauthorized' })
 @ApiResponse({ status: 406, description: 'Not Acceptable' })
 create(@Body() payload: CreateTenantDto, @Param('tenant') tenant: string) {
  return this.tenantService.create(payload, tenant)
 }

 @UseGuards(JwtAuthGuard)
 @Patch(':tenant/:id')
 @ApiParam({ name: 'tenant', description: 'Tenant that you need retrieve the data' })
 @ApiParam({ name: 'id', description: 'serviceName' })
 @ApiOperation({ summary: 'Update a configuration' })
 @ApiResponse({ status: 201, description: 'Created' })
 @ApiResponse({ status: 400, description: 'Bad Request' })
 @ApiResponse({ status: 401, description: 'Unauthorized' })
 @ApiResponse({ status: 406, description: 'Not Acceptable' })
 update(@Param('tenant') tenant: string, @Param('id') id: string, @Body() payload: UpdateTenantDto) {
  return this.tenantService.update(id, tenant, payload)
 }

 @UseGuards(JwtAuthGuard)
 @Patch(':tenant/:id/backup')
 @ApiParam({ name: 'tenant', description: 'Prefix of tenant' })
 @ApiParam({ name: 'id', description: 'serviceName' })
 @ApiOperation({ summary: 'Recovery to the last backup' })
 @ApiResponse({ status: 201, description: 'Created' })
 @ApiResponse({ status: 400, description: 'Bad Request' })
 @ApiResponse({ status: 401, description: 'Unauthorized' })
 @ApiResponse({ status: 406, description: 'Not Acceptable' })
 recoverytoTheLastBackup(@Param('tenant') tenant: string, @Param('id') id: string) {
  return this.tenantService.recoverytoTheLastBackup(id, tenant)
 }
}
