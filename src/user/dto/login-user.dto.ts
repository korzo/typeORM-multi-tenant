import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { OneToMany } from 'typeorm'

export class LoginDto {
 @IsNotEmpty({ message: 'The field username is mandatory' })
 @ApiProperty()
 @OneToMany(() => LoginDto, (loginDto) => loginDto.username, { lazy: true })
 username: string

 @IsNotEmpty({ message: 'The field password is mandatory' })
 @ApiProperty()
 password: string

 @IsNotEmpty({ message: 'The field tenant is mandatory' })
 @ApiProperty()
 tenant: string
}
