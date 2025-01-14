import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    version(): string;
    ping(): any;
}
