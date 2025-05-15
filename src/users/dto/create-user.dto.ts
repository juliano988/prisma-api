import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'generated/prisma';

export class CreateUserDto implements Omit<User, 'id' | 'createdAt'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  admin: boolean;
}
