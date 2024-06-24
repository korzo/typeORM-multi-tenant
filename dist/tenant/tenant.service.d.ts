import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
export declare class TenantService {
    private moduleRef;
    private readonly configService;
    private readonly httpService;
    private readonly logger;
    constructor(moduleRef: ModuleRef, configService: ConfigService, httpService: HttpService);
    private loadEntityManager;
    AllTenantAlias(): Promise<any[]>;
    loadEnv(): string;
    findOne(id: string, tenant: string): Promise<Tenant>;
    create(payload: CreateTenantDto, tenant: string): Promise<Tenant | any>;
    update(id: string, tenant: string, payload: UpdateTenantDto): Promise<Tenant | any>;
    recoverytoTheLastBackup(id: string, tenant: string): Promise<Tenant | any>;
    mDocToken(): Promise<AxiosResponse>;
}
