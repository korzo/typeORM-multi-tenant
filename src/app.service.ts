import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
 private readonly logger = new Logger(AppService.name)
 
 constructor(private configService: ConfigService) {}

 version(): string {
  return this.configService.get<string>('npm_package_version')
 }

 ping(): any {
  this.logger.log('The test of ping is working...')
  return {
   timestamp: new Date().toISOString(),
   text: 'pong'
  }
 }
}
