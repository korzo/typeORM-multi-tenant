import { Injectable, Logger } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { LoginDto } from '../user/dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'
import { map } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
 private readonly logger = new Logger(AuthService.name)

 constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly confiigService: ConfigService) {}

 async validateUser(loginDto: LoginDto): Promise<any> {
  return this.userService.signIn(loginDto)
 }

 async signIn(loginDto: LoginDto) {
  const payload = { username: loginDto.username, env: this.confiigService.get<string>('ENV') }
  return this.userService.signIn(loginDto).pipe(
   map((resp) => {
    if (resp.statusCode == 200) {
     return {
      token: this.jwtService.sign(payload)
     }
    }

    return resp
   })
  )
 }
}
