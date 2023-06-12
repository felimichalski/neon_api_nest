import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';

@Module({
  controllers: [SizesController],
  providers: [SizesService],
  exports: [SizesService],
  imports: [TypeOrmModule.forFeature([Size])],
})
export class SizesModule {}
