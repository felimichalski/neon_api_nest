import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  unit_price: number;

  sizes: number[];

  color: string;

  category: number;

  @IsNotEmpty()
  description: string;

  is_featured?: string;
}
