import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { LoginDto } from './dto/login-user.dto'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { Observable, catchError, map } from 'rxjs'

@Injectable()
export class UserService {
 private readonly logger = new Logger(UserService.name)

 constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

 signIn(login: LoginDto): Observable<any> {
  const uri = `https://${login.tenant}.nextgen.${this.configService.get<string>('ENV')}.mdoc.app/api/users/_login`
  this.logger.debug(`uri: ${uri}`)
  const cfg: AxiosRequestConfig = {
   headers: {
    accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'ms-mirth'
   },
   params: {
    username: login.username,
    password: login.password
   }
  }

  try {
   return this.httpService.post(uri, {}, cfg).pipe(
    catchError((error: AxiosError) => {
     if (error.code === 'ECONNREFUSED') {
      this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}`)
      throw new HttpException(
       {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `Failure on connection with the adress: ${uri}. Please check if this address is available and connecting.`,
        error: 'Unprocessable Entity',
        trace: error.message || null
       },
       HttpStatus.UNPROCESSABLE_ENTITY
      )
     }

     if (error.code === 'ECONNABORTED') {
      this.logger.error(
       `Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`
      )
      throw new HttpException(
       {
        statusCode: HttpStatus.REQUEST_TIMEOUT,
        message: `Failure on connection with the adress: ${uri}. Please check if this address is available and connecting.`,
        error: 'Request Timeout',
        trace: error.message || null
       },
       HttpStatus.REQUEST_TIMEOUT
      )
     }

     if (error.code === 'ERR_INVALID_URL') {
      this.logger.error(
       `Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`
      )

      throw new HttpException(
       {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Invalid URL! Please check e retry again. Your url inputed on login: ${uri}.`,
        error: 'Bad Request',
        trace: error.message || null
       },
       HttpStatus.BAD_REQUEST
      )
     }

     if (error.code === 'ENOTFOUND') {
      this.logger.error(
       `Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`
      )

      throw new HttpException(
       {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Please check your request for the environment: ${uri}.`,
        error: 'Not Found',
        trace: error.message || null
       },
       HttpStatus.NOT_FOUND
      )
     }

     if (error.code === 'ERR_BAD_REQUEST') {
      this.logger.error(
       `Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`
      )

      throw new HttpException(
       {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect username or password',
        error: 'Unauthorized',
        trace: error.message
       },
       HttpStatus.UNAUTHORIZED
      )
     }

     this.logger.error(
      `Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`
     )
     throw new HttpException(
      {
       statusCode: HttpStatus.BAD_REQUEST,
       message: 'Error Unknown. Please contact the support team for more details',
       error: 'Error Unknown',
       trace: error.code
      },
      HttpStatus.BAD_REQUEST
     )
    }),
    map((resp: AxiosResponse<any>) => {
     this.logger.log(`Login successfully with the username: ${login.username} in the env: ${uri}`)
     return {
      statusCode: resp.status,
      text: 'Login Successfully'
     }
    })
   )
  } catch (error) {
   this.logger.error(
    `Login failure with the username: ${login.username} in the env: ${uri}.
    ${error}`
   )
   throw new HttpException(error.message || 'Internal Error', HttpStatus.INTERNAL_SERVER_ERROR)
  }
 }

 findAll() {
  return `This action returns all auth`
 }
}
