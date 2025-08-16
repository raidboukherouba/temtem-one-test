import { 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsUrl, 
  Length, 
  Min 
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50) // name must be between 3 and 50 chars
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 500) // description between 10 and 500 chars
  description: string;

  @IsNumber()
  @Min(0) // price cannot be negative
  price: number;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  categoryId?: number; // optional in Prisma schema

  @IsNotEmpty()
  @IsNumber()
  createdById: number; // required (relation to User)
}