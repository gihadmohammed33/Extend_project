import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Method to find all products
  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Method to find a single product by ID
  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  // Create method
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto); // Ensure product is created correctly
    console.log('Product to be saved:', product); // Log the product before saving
    return this.productRepository.save(product);
  }

  // Update method
  async update(id: number, updatedProduct: CreateProductDto): Promise<Product> {
    await this.productRepository.update(id, updatedProduct);
    return this.productRepository.findOne({ where: { id } });
  }

  // Remove method
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
