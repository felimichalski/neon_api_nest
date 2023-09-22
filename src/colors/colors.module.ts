import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService],
  exports: [ColorsService],
  imports: [TypeOrmModule.forFeature([Color])],
})
export class ColorsModule {}
