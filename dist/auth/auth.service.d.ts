import { UserService } from '../user/user.service';
import { LoginDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly confiigService;
    private readonly logger;
    constructor(userService: UserService, jwtService: JwtService, confiigService: ConfigService);
    validateUser(loginDto: LoginDto): Promise<any>;
    signIn(loginDto: LoginDto): Promise<import("rxjs").Observable<any>>;
}
