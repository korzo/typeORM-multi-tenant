import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private readonly authService;
    constructor(authService: AuthService);
    findOne(loginDto: LoginDto): Promise<import("rxjs").Observable<any>>;
}
