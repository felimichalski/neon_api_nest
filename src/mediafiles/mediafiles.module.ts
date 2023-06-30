import { Module } from '@nestjs/common';
import { MediafilesService } from './mediafiles.service';
import { MediafilesController } from './mediafiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mediafile } from './entities/mediafile.entity';

@Module({
  providers: [MediafilesService],
  exports: [MediafilesService],
  controllers: [MediafilesController],
  imports: [TypeOrmModule.forFeature([Mediafile])],
})
export class MediafilesModule {}
