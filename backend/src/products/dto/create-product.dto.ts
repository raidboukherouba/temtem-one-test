import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  categoryId?: number; // category is optional in Prisma schema

  @IsNotEmpty()
  createdById: number; // required because of relation to User
}