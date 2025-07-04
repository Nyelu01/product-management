import { Module } from '@nestjs/common';
import { InventoriesService } from './services/inventories/inventories.service';
import { InventoriesController } from './controllers/inventories/inventories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { StoreProduct } from './entities/store-product/store-product.entity';
import { Store } from './entities/store/store.entity';
import { ProductsService } from '../products/services/products.service';
import { StoreService } from './services/store/store.service';
import { StoreController } from './controllers/store/store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, StoreProduct, Store])],
  providers: [InventoriesService, ProductsService, StoreService],
  controllers: [InventoriesController, StoreController],
})
export class InventoriesModule {}
