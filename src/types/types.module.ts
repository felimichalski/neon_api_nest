import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [TypeOrmModule.forFeature([Type])],
})
export class TypesModule {}
