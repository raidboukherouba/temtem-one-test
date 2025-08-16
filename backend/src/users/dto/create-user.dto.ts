import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length, 
  MaxLength 
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100) // avoid excessively long emails
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50) // password between 6–50 chars
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role; // Defaults to GUEST in Prisma schema
}