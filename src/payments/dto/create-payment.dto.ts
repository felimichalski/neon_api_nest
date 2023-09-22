import { Client } from 'src/client/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreatePaymentDto {
  products: Product[];
  client: Client;
  shipping: boolean;
}
