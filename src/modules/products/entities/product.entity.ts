import { StoreProduct } from '../../../modules/inventories/entities/store-product/store-product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  price: string;

  @Column({ nullable: true, type: 'varchar' })
  description?: string;

  // Relationships
  @OneToMany(() => StoreProduct, (storeProduct) => storeProduct.product)
  storeProducts: StoreProduct[];
}
