import { LoginDto } from './dto/login-user.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
export declare class UserService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService);
    signIn(login: LoginDto): Observable<any>;
    findAll(): string;
}
