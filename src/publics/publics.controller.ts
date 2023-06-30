import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PublicsService } from './publics.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';

@Controller('publics')
export class PublicsController {
  constructor(private readonly publicsService: PublicsService) {}

  @Post()
  create(@Body() createPublicDto: CreatePublicDto) {
    return this.publicsService.create(createPublicDto);
  }

  @Get()
  findAll() {
    return this.publicsService.findAll();
  }

  @Patch()
  update(@Body() updatePublicDto: UpdatePublicDto) {
    return this.publicsService.update(updatePublicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicsService.remove(+id);
  }
}
