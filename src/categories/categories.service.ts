import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(newCategory) {
    try {
      const category = this.categoryRepository.create(newCategory);
      return this.categoryRepository.save(category);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot save category', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const response = await this.categoryRepository.find();
    console.log(response);
    return response;
  }

  findAllThin() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .select(['id AS value', 'name AS label'])
      .getRawMany();
  }

  findByIds(categories: number[]) {
    return this.categoryRepository.findBy({
      id: In(categories),
    });
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({
      relations: {
        type: true,
      },
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
