import { Module } from '@nestjs/common';
import { MediafilesService } from './mediafiles.service';
import { MediafilesController } from './mediafiles.controller';

@Module({
  providers: [MediafilesService],
  exports: [MediafilesService],
  controllers: [MediafilesController],
})
export class MediafilesModule {}
