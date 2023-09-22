import { Module } from '@nestjs/common';
import { PublicsService } from './publics.service';
import { PublicsController } from './publics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Public } from './entities/public.entity';

@Module({
  controllers: [PublicsController],
  providers: [PublicsService],
  imports: [TypeOrmModule.forFeature([Public])],
  exports: [PublicsService],
})
export class PublicsModule {}
