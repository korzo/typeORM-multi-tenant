import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
 handleRequest(err, user, info, context, status) {
  const request = context.switchToHttp().getRequest()
  const { mobile, password } = request.body
  if (err || !user) {
   if (!mobile) {
    throw new HttpException({ message: 'Success' }, HttpStatus.OK)
   } else if (!password) {
    throw new HttpException({ message: 'Success' }, HttpStatus.OK)
   } else {
    throw err || new UnauthorizedException()
   }
  }
  return user
 }
}
