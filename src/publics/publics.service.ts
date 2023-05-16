import { Injectable } from '@nestjs/common';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';
import { Public } from './entities/public.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublicsService {
  constructor(
    @InjectRepository(Public)
    private readonly publicsRepository: Repository<Public>,
  ) {}
  create(createPublicDto: CreatePublicDto) {
    const publicCreate = this.publicsRepository.create(createPublicDto);
    console.log(publicCreate);
    return this.publicsRepository.save(publicCreate);
  }

  findAll() {
    return this.publicsRepository.find();
  }

  /* findOne(id: number) {
    return `This action returns a #${id} public`;
  } */

  update(updatePublicDto: UpdatePublicDto) {
    return this.publicsRepository.update(
      { name: updatePublicDto.name },
      updatePublicDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} public`;
  }
}
