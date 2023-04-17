import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);

    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findByCategory(categoryId) {
    return this.productsRepository.findAndCountBy({
      category: categoryId,
    });
  }

  findByType(type) {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category', `category.type = ${type}`)
      .getManyAndCount();
  }

  findAllFeatured() {
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'assd')
      .where('product.isFeatured = true')
      .getMany();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
