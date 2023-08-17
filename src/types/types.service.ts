import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  create(createTypeDto: CreateTypeDto) {
    return 'This action adds a new type';
  }

  findAll() {
    return this.typeRepository.find();
  }

  findAllWithCategories() {
    return this.typeRepository
      .createQueryBuilder('types')
      .leftJoinAndSelect('types.categories', 'categories')
      .orderBy('categories.name', 'ASC')
      .getMany();
  }

  findOne(id: number) {
    return this.typeRepository.findOneBy({
      id,
    });
    // .createQueryBuilder('types')
    // .leftJoinAndSelect('types.categories', 'categories')
    // .where(`categories.id = ${id}`)
    // .orderBy('categories.name', 'ASC')
    // .getMany();
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
