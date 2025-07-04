import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { InventoriesService } from '../../services/inventories/inventories.service';
import { CreateStoreProductDto } from '../../dtos/store-product/create-store-product.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  @UsePipes(CreateStoreProductDto)
  async createStoreProduct(
    @Body() createStoreProductDto: CreateStoreProductDto,
  ) {
    return await this.inventoriesService.createStoreProduct(
      createStoreProductDto,
    );
  }
}
