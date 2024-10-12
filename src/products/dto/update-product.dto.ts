import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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
