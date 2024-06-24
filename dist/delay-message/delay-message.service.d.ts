import { CreateDelayMessageDto } from './dto/create-delay-message.dto';
import { UpdateDelayMessageDto } from './dto/update-delay-message.dto';
import { DelayMessage } from './entities/delay-message.entity';
import { ModuleRef } from '@nestjs/core';
export declare class DelayMessageService {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    private loadEntityManager;
    findAll(tenant: string): Promise<DelayMessage[]>;
    create(createDelayMessageDto: CreateDelayMessageDto): string;
    findOne(id: number): string;
    update(id: number, updateDelayMessageDto: UpdateDelayMessageDto): string;
    remove(id: number): string;
}
