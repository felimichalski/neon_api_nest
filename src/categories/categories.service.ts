import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findAllByTypes() {
    const firstType = await this.categoryRepository.findBy({
      type: 1,
    });

    const secondType = await this.categoryRepository.findBy({
      type: 2,
    });

    const thirdType = await this.categoryRepository.findBy({
      type: 3,
    });

    return {
      firstType,
      secondType,
      thirdType,
    };
  }

  findByType(type) {
    return this.categoryRepository.findBy({
      type,
    });
  }

  async findOne(id: number) {
    return this.categoryRepository.findOneBy({
      id,
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
