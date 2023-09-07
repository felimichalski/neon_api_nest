import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { MediafilesService } from 'src/mediafiles/mediafiles.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly mediafilesService: MediafilesService,
  ) {}

  async create(newProduct) {
    try {
      const product = await this.productsRepository.create(newProduct);
      return this.productsRepository.save(product);
    } catch (error) {
      console.error(error);
      await this.mediafilesService.delete(newProduct.image);
      throw new HttpException('Cannot save product', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.price', 'price')
      .getMany();
  }

  findByCategory(categoryId) {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect(
        'product.categories',
        'category',
        'category.id = :categoryId',
        { categoryId },
      )
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.price', 'price')
      .getMany();
  }

  findByType(type) {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoin('product.categories', 'category', `category.type = ${type}`)
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.price', 'price')
      .getMany();
  }

  findAllFeatured() {
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.price', 'price')
      .where('product.is_featured = true')
      .getMany();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: {
        id,
      },
      relations: ['categories', 'size', 'price'],
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
