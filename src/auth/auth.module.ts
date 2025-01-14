import { Logger, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth.constants'
import { JwtStrategy } from './jwt.strategy'

@Module({
 imports: [
  UserModule,
  PassportModule,
  JwtModule.register({
   secret: jwtConstants.secret,
   signOptions: { expiresIn: '3600s' }
  })
 ],
 providers: [AuthService, LocalStrategy, JwtModule, JwtStrategy, Logger],
 exports: [JwtModule, AuthService]
})
export class AuthModule {}
