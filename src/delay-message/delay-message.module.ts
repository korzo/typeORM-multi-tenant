import { Module } from '@nestjs/common'
import { DelayMessageService } from './delay-message.service'
import { DelayMessageController } from './delay-message.controller'

@Module({
 controllers: [DelayMessageController],
 providers: [DelayMessageService]
})
export class DelayMessageModule {}
