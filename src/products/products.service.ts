import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
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

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create(createProductDto);
      const response = await this.productsRepository.save(product);
      return response;
    } catch (error) {
      console.error(error);
      const files = createProductDto.image.split(',');
      for (const file of files) {
        await this.mediafilesService.delete(file);
      }
      throw new HttpException('Cannot save product', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .getMany();
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
      .leftJoinAndSelect('product.category', 'category')
      .where('product.isFeatured = true')
      .getMany();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
