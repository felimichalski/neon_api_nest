import { PartialType } from '@nestjs/mapped-types';
import { CreateMediafileDto } from './create-mediafile-dto';

export class UpdateMediaDto extends PartialType(CreateMediafileDto) {}
