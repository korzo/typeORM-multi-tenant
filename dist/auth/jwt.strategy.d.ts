import { Strategy } from 'passport-jwt';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: LoginDto): Promise<{
        username: string;
        env: string;
    }>;
}
export {};
