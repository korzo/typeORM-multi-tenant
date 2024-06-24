import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateDelayMessageDto {
 @IsNotEmpty({ message: 'The field serviceName is mandatory' })
 @ApiProperty()
 serviceName: string

 @IsNotEmpty({ message: 'The field cfg is mandatory' })
 @ApiProperty()
 cfg: string

 backup: string
}
