import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from './auth.constants'
import { LoginDto } from 'src/user/dto/login-user.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(private readonly configService: ConfigService) {
  super({
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   ignoreExpiration: false,
   secretOrKey: jwtConstants.secret
  })
 }

 async validate(payload: LoginDto) {
  return { username: payload.username, env: this.configService.get<string>('ENV') }
 }
}
