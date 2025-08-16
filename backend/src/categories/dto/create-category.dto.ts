import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50) // category name must be 3–50 chars
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 200) // description optional but max 200 chars
  description?: string;
}