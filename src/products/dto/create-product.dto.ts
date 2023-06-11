import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
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

  is_featured?: boolean;
}
