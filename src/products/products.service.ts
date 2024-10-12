import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  //for creating new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    //Create instance of product Entinty by passing its dto data
    const productRepo = this.productsRepository.create(createProductDto);
    //Save New Product instance in db
    return await this.productsRepository.save(productRepo);
  }

  //for fetching all products
  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findOneBy({ id });
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

  //for deleting product
  async remove(id: string): Promise<{ message: string }> {
    //Fetch existing product from db;
    const product = await this.productsRepository.findOneBy({ id });

    //Checking if any product exists before deleting
    if (!product) {
      throw new NotFoundException(`No product with id ${id} exists.`);
    }

    await this.productsRepository.delete(product);

    return { message: 'product deleted successfully' };
  }
}
