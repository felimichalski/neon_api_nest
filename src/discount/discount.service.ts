import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}
  create(createDiscountDto: CreateDiscountDto) {
    return this.discountRepository.save(createDiscountDto);
  }

  findAll() {
    return this.discountRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return this.discountRepository.delete(id);
  }
}
