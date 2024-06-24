import { Controller, Post, Body } from '@nestjs/common'
import { LoginDto } from './dto/login-user.dto'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from 'src/auth/auth.service'

@ApiTags('User')
@Controller('/v1/user')
export class UserController {
 constructor(private readonly authService: AuthService) {}

 //  @UseGuards(LocalAuthGuard)
 @Post('login')
 @ApiResponse({ status: 201, description: 'Created' })
 @ApiResponse({ status: 400, description: 'Bad Request' })
 @ApiResponse({ status: 401, description: 'Unauthorized' })
 @ApiResponse({ status: 404, description: 'Not Found' })
 @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
 @ApiBody({
  type: LoginDto,
  description: 'Structure for User Login'
 })
 @ApiOperation({ summary: 'Service to the proccess of Login' })
 findOne(@Body() loginDto: LoginDto) {
  return this.authService.signIn(loginDto)
 }
}
