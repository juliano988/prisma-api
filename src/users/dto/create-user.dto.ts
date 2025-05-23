import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'generated/prisma';

export class CreateUserDto implements Omit<User, 'id' | 'createdAt'> {
  @ApiProperty({ description: 'Email do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Define se usuário é administrador' })
  @IsBoolean()
  admin: boolean;
}
