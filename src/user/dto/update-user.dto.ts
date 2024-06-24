import { PartialType } from '@nestjs/swagger'
import { LoginDto } from './login-user.dto'

export class UpdateAuthDto extends PartialType(LoginDto) {}
