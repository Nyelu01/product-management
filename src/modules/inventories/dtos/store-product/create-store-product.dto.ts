import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';

export class CreateStoreProductDto {
  @IsInt({ message: 'storeId must be an integer' })
  @Min(1, { message: 'storeId must be greater than 0' })
  storeId: number;

  @IsArray({ message: 'products must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}
