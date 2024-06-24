import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    storeTenants(): Promise<any[]>;
    loadEnv(): string;
    findOne(tenant: string, id: string): Promise<import("./entities/tenant.entity").Tenant>;
    create(payload: CreateTenantDto, tenant: string): Promise<any>;
    update(tenant: string, id: string, payload: UpdateTenantDto): Promise<any>;
    recoverytoTheLastBackup(tenant: string, id: string): Promise<any>;
}
