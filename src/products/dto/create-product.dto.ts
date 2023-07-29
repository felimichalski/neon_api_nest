import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  categories: number[];

  @IsNotEmpty()
  small_width: number;
  @IsNotEmpty()
  small_height: number;
  @IsNotEmpty()
  small_price: number;

  @IsNotEmpty()
  medium_width: number;
  @IsNotEmpty()
  medium_height: number;
  @IsNotEmpty()
  medium_price: number;

  @IsNotEmpty()
  large_width: number;
  @IsNotEmpty()
  large_height: number;
  @IsNotEmpty()
  large_price: number;

  @IsNotEmpty()
  description: string;

  is_featured?: string;
}
