import { DelayMessageService } from './delay-message.service';
import { CreateDelayMessageDto } from './dto/create-delay-message.dto';
import { UpdateDelayMessageDto } from './dto/update-delay-message.dto';
import { DelayMessage } from './entities/delay-message.entity';
export declare class DelayMessageController {
    private readonly delayMessageService;
    constructor(delayMessageService: DelayMessageService);
    findAll(tenant: string): Promise<DelayMessage[]>;
    create(createDelayMessageDto: CreateDelayMessageDto): string;
    findOne(id: string): string;
    update(id: string, updateDelayMessageDto: UpdateDelayMessageDto): string;
    remove(id: string): string;
}
