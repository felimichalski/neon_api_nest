import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { MediafilesService } from './mediafiles.service';

@Controller('mediafiles')
export class MediafilesController {
  constructor(private readonly mediafilesService: MediafilesService) {}

  @Get(':objectKey')
  async get(@Param('objectKey') objectKey: string, @Res() response) {
    const file = await this.mediafilesService.get(objectKey);

    // @ts-ignore
    file.Body.pipe(response);
  }
}
