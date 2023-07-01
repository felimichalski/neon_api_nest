import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  unit_price: number;

  sizes: number[];

  color: string;

  categories: number[];

  small_width: number;
  small_height: number;

  medium_width: number;
  medium_height: number;

  large_width: number;
  large_height: number;

  @IsNotEmpty()
  description: string;

  is_featured?: string;
}
