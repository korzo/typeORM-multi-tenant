import { PartialType } from '@nestjs/swagger'
import { CreateDelayMessageDto } from './create-delay-message.dto'

export class UpdateDelayMessageDto extends PartialType(CreateDelayMessageDto) {}
