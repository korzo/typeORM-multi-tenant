import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { HttpModule } from '@nestjs/axios'
import { AuthModule } from 'src/auth/auth.module'

@Module({
 controllers: [UserController],
 providers: [UserService],
 exports: [UserService],
 imports: [HttpModule.register({ timeout: 10000, maxRedirects: 10 }), forwardRef(() => AuthModule)]
})
export class UserModule {}
