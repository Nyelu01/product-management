import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/services/products.service';
import { DataSource } from 'typeorm';
import { CreateStoreProductDto } from '../../dtos/store-product/create-store-product.dto';
import { StoreProduct } from '../../entities/store-product/store-product.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Store } from '../../entities/store/store.entity';

@Injectable()
export class InventoriesService {
  constructor(
    private readonly productsService: ProductsService,

    private readonly dataSource: DataSource,
  ) {}

  async createStoreProduct(
    createStoreProductDto: CreateStoreProductDto,
  ): Promise<StoreProduct[]> {
    const { storeId, products } = createStoreProductDto;

    return await this.dataSource.transaction(
      async (manager): Promise<StoreProduct[]> => {
        const store = await manager.findOne(Store, {
          where: { id: storeId },
        });

        if (!store) {
          throw new NotFoundException(`Store with ID ${storeId} not found`);
        }

        const createdStoreProducts: StoreProduct[] = [];

        for (const item of products) {
          let product = await manager.findOne(Product, {
            where: { name: item.name },
          });

          if (!product) {
            // Reuse create from ProductsService with manager
            product = await this.productsService.create(item, manager);
          }

          const storeProduct = manager.create(StoreProduct, {
            product,
            store,
          });

          await manager.save(StoreProduct, storeProduct);
          createdStoreProducts.push(storeProduct);
        }

        return createdStoreProducts;
      },
    );
  }
}
