import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { In, Repository } from 'typeorm';
import { Size } from './entities/size.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}
  create(createSizeDto: CreateSizeDto) {
    return 'This action adds a new size';
  }

  findAll() {
    return this.sizeRepository.find();
  }

  findAllThin() {
    return this.sizeRepository
      .createQueryBuilder('size')
      .select(['id AS value', 'code AS label'])
      .getRawMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  findByIds(sizes: number[]) {
    return this.sizeRepository.findBy({
      id: In(sizes),
    });
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return this.sizeRepository.delete(id);
  }
}
