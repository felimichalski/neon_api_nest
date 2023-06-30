import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MediafilesService } from 'src/mediafiles/mediafiles.service';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';

const FilesInterceptorObj = FilesInterceptor('files', 10, {
  fileFilter: (_, file, cb) => {
    !['image', 'video'].includes(file.mimetype.split('/')[0]) ||
    file.size > 10000000
      ? cb(null, false)
      : cb(null, true);
  },
});

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly mediafilesService: MediafilesService,
    private readonly colorsService: ColorsService,
    private readonly sizesService: SizesService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptorObj)
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const uploadedFiles = await this.mediafilesService.upload(files);
    const sizes = await this.sizesService.findByIds(createProductDto.sizes);

    const newProduct = {
      ...createProductDto,
      sizes,
      color: JSON.parse(createProductDto.color),
      is_featured: JSON.parse(createProductDto.is_featured),
      images: uploadedFiles,
    };

    return this.productsService.create(newProduct);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('filter/:type')
  findByType(@Param('type') type: string) {
    return this.productsService.findByType(+type);
  }

  @Get('filter/:type/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findByCategory(+categoryId);
  }

  @Get('featured')
  findAllFeatured() {
    return this.productsService.findAllFeatured();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
