import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login-user.dto';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private readonly logger;
    constructor(authService: AuthService);
    validate(loginDto: LoginDto): Promise<any>;
}
export {};
