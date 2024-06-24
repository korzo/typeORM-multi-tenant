import { OnModuleInit } from '@nestjs/common';
import { EntityManager } from "typeorm";
export interface Tenant {
    id: string;
    deleted: boolean;
    created_by: string;
    created_date: string;
    updated_by: string;
    updated_date: string;
    name: string;
    description: string;
    alias: string;
    admin: string;
    timezone: any;
    language: any;
}
export interface TenantConfiguration {
    id: string;
    deleted: boolean;
    created_by: string;
    created_date: string;
    updated_by: string;
    updated_date: string;
    id_tenant: string;
    description: string;
    id_config_type_database: string;
    id_config_type_style: string;
    id_config_type_integration: any;
    id_config_type_other: any;
    is_active: boolean;
}
export interface configurationItem {
    id: string;
    deleted: boolean;
    created_by: string;
    created_date: string;
    updated_by: string;
    updated_date: string;
    id_config_type: string;
    description: string;
    key: string;
    value: string;
}
export declare class AppAfterInitializer implements OnModuleInit {
    private readonly entityManager;
    constructor(entityManager: EntityManager);
    onModuleInit(): Promise<void>;
    private configurationDatabaseTenants;
}
