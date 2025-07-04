import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  //for creating new product
  async create(
    createProductDto: CreateProductDto,
    manager?: EntityManager,
  ): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);

    if (manager) {
      return await manager.save(Product, product);
    }

    return await this.productsRepository.save(product);
  }

  //for fetching all products
  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: ['storeProducts'], // if you want to include related storeProducts
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['storeProducts'], // include relations if needed
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }
  //for updating product
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    //Fetch existing product from data base;
    const product = await this.productsRepository.findOneBy({ id });

    //Checking if any product exists before updating
    if (!product) {
      throw new NotFoundException(`No product with id ${id} exists.`);
    }

    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }
}
