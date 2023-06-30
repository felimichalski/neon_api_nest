import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MediafilesModule } from 'src/mediafiles/mediafiles.module';
import { SizesModule } from 'src/sizes/sizes.module';
import { ColorsModule } from 'src/colors/colors.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    MediafilesModule,
    SizesModule,
    ColorsModule,
  ],
})
export class ProductsModule {}
