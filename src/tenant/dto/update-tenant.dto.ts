import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UpdateTenantDto {
 @IsNotEmpty({ message: 'The field cfg is mandatory' })
 @ApiProperty()
 cfg: string
}
