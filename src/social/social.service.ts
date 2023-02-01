import { Injectable } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>,
  ) {}
  create(createSocialDto: CreateSocialDto) {
    return 'This action adds a new social';
  }

  findAll() {
    return this.socialRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} social`;
  }

  update(id: number, updateSocialDto: UpdateSocialDto) {
    return `This action updates a #${id} social`;
  }

  remove(id: number) {
    return `This action removes a #${id} social`;
  }
}
