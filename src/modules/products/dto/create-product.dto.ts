import { IsNotEmpty, IsString, IsOptional, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'name should be a valid string' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  price: string;
}
