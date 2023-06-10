import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  title: string;

  image?: string;

  @IsNotEmpty()
  unit_price: number;

  size?: string;

  @IsNotEmpty()
  color: boolean;

  category?: number;

  @IsNotEmpty()
  description: string;

  isFeatured?: boolean;
}
