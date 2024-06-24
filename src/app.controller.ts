import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('App')
@Controller()
export class AppController {
 constructor(private readonly appService: AppService) {}

 @Get('version')
 @ApiOperation({ summary: 'Get the app version' })
 @ApiOkResponse({ status: 200, description: 'The fetch has been successfully created.' })
 version(): string {
  return this.appService.version()
 }

 @Get('ping')
 @ApiOperation({ summary: 'Test connection app' })
 @ApiOkResponse({ status: 200, description: 'The fetch has been successfully created.' })
 checkUp(): any {
  return this.appService.ping()
 }
}
