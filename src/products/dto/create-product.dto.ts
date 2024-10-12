import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsDecimal,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'name should be a valid string' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  price: string;

  @IsNumber({}, { message: 'Quantity should be a number' })
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
