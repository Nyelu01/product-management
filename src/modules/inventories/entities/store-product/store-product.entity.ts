import { Product } from '../../../../modules/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';
import { Store } from '../store/store.entity';

@Entity('store_products')
export class StoreProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //Relationships
  @ManyToOne(() => Product, (product) => product.storeProducts)
  product: Product;

  @ManyToOne(() => Store, (store) => store.storeProducts)
  store: Store;
}
