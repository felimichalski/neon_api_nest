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
import { SizesService } from 'src/sizes/sizes.service';
import { Size } from 'src/sizes/entities/size.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Price } from 'src/price/entities/price.entity';

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
    private readonly categoriesService: CategoriesService,
    private readonly sizesService: SizesService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptorObj)
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const uploadedFiles = await this.mediafilesService.upload(files);
    const categories = await this.categoriesService.findByIds(
      createProductDto.categories,
    );
    const size = this.buildSizeFromDto(createProductDto);
    const price = this.buildPriceFromDto(createProductDto);

    const newProduct = {
      ...createProductDto,
      categories,
      size,
      price,
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
  async remove(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(+id);
      await this.productsService.remove(+id);
      await this.sizesService.remove(product.size.id);
      return this.mediafilesService.delete(product.images);
    } catch (error) {}
  }

  private buildSizeFromDto(createProductDto: CreateProductDto): Size {
    return {
      small_width: createProductDto.small_width,
      small_height: createProductDto.small_height,
      medium_width: createProductDto.medium_width,
      medium_height: createProductDto.medium_height,
      large_width: createProductDto.large_width,
      large_height: createProductDto.large_height,
    };
  }

  private buildPriceFromDto(createProductDto: CreateProductDto): Price {
    return {
      small: createProductDto.small_price,
      medium: createProductDto.medium_price,
      large: createProductDto.large_price,
    };
  }
}
