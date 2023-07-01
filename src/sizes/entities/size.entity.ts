import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  small_width: number;

  @Column()
  small_height: number;

  @Column()
  medium_width: number;

  @Column()
  medium_height: number;

  @Column()
  large_width: number;

  @Column()
  large_height: number;

  @OneToMany(() => Product, (product) => product.size, {
    onDelete: 'CASCADE',
  })
  product?: Product[];
}
