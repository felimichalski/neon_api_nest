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
      const product = this.productsRepository.create(newProduct as Product);
      const response = await this.productsRepository.save(product);
      // for (const image in newProduct.images) {
      //   await this.mediafilesService.create({
      //     key: `${process.env.AWS_S3_FOLDERNAME}/${image}`,
      //     product: response.id,
      //   });
      // }
      return response;
    } catch (error) {
      console.error(error);
      await this.mediafilesService.delete(newProduct.image);
      throw new HttpException('Cannot save product', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .getMany();
  }

  findByCategory(categoryId) {
    return this.productsRepository.findBy({
      category: categoryId,
    });
  }

  findByType(type) {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category', `category.type = ${type}`)
      .leftJoinAndSelect('product.images', 'images')
      .getMany();
  }

  findAllFeatured() {
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .where('product.is_featured = true')
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
    // return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
