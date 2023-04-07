import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  title: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  unit_price: number;

  category?: number;

  @IsNotEmpty()
  description: string;

  isFeatured?: boolean;
}
