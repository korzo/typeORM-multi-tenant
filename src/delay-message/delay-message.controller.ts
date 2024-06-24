import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { DelayMessageService } from './delay-message.service'
import { CreateDelayMessageDto } from './dto/create-delay-message.dto'
import { UpdateDelayMessageDto } from './dto/update-delay-message.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { DelayMessage } from './entities/delay-message.entity'

@ApiTags('Delay Message')
@UseGuards(JwtAuthGuard)
@ApiSecurity('jwt-token')
@Controller('v1/delay-message/')
export class DelayMessageController {
 constructor(private readonly delayMessageService: DelayMessageService) {}

 @Get(':tenant')
 @ApiParam({ name: 'tenant', description: 'Tenant that you need retrieve the data' })
 @ApiOperation({ summary: 'Retrieve the last 100 message' })
 @ApiResponse({ status: 200, description: 'Ok' })
 @ApiResponse({ status: 401, description: 'Unauthorized' })
 @ApiResponse({ status: 404, description: 'Not Found' })
 async findAll(@Param('tenant') tenant: string): Promise<DelayMessage[]> {
  return this.delayMessageService.findAll(tenant)
 }

 @Post()
 @ApiExcludeEndpoint(true)
 create(@Body() createDelayMessageDto: CreateDelayMessageDto) {
  return this.delayMessageService.create(createDelayMessageDto)
 }

 @Get(':id')
 @ApiExcludeEndpoint(true)
 findOne(@Param('id') id: string) {
  return this.delayMessageService.findOne(+id)
 }

 @Patch(':id')
 @ApiExcludeEndpoint(true)
 update(@Param('id') id: string, @Body() updateDelayMessageDto: UpdateDelayMessageDto) {
  return this.delayMessageService.update(+id, updateDelayMessageDto)
 }

 @Delete(':id')
 @ApiExcludeEndpoint(true)
 remove(@Param('id') id: string) {
  return this.delayMessageService.remove(+id)
 }
}
