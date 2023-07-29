import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  small: number;

  @Column()
  medium: number;

  @Column()
  large: number;

  @OneToOne(() => Product, (product) => product.price, {
    onDelete: 'CASCADE',
  })
  product?: Product;
}
