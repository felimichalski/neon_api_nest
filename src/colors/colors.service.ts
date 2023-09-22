import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { In, Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  create(createColorDto: CreateColorDto) {
    return 'This action adds a new color';
  }

  findAll() {
    return this.colorRepository.find();
  }

  findAllThin() {
    return this.colorRepository
      .createQueryBuilder('color')
      .select(['id AS value', 'name AS label'])
      .getRawMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  findByIds(colors: number[]) {
    return this.colorRepository.findBy({
      id: In(colors),
    });
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return `This action updates a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }
}
