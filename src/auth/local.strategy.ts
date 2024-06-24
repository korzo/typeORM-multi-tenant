import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from '../user/dto/login-user.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
 private readonly logger = new Logger(LocalStrategy.name)

 constructor(private authService: AuthService) {
  super()
 }

 async validate(loginDto: LoginDto): Promise<any> {
  this.logger.log(loginDto.password)
  const user = await this.authService.validateUser(loginDto)
  if (!user) {
   throw new UnauthorizedException()
  }
  return user
 }
}
