import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService],
  imports: [TypeOrmModule.forFeature([Discount])],
})
export class DiscountModule {}
