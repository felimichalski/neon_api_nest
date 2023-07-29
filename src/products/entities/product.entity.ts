import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { Mediafile } from 'src/mediafiles/entities/mediafile.entity';
import { Price } from 'src/price/entities/price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Mediafile, (mediafile) => mediafile.product, {
    cascade: true,
    eager: true,
  })
  images: Mediafile[];

  @OneToOne(() => Price, { cascade: true })
  @JoinColumn({ name: 'unit_price' })
  @Column({ nullable: true })
  unit_price: Price;

  @OneToOne(() => Price, { cascade: true })
  @JoinColumn({ name: 'price' })
  @Column({ nullable: true })
  price: Price;

  @OneToOne(() => Size, { cascade: true })
  @JoinColumn({ name: 'size' })
  @Column()
  size: Size;

  @Column()
  color: boolean;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable({ name: 'categories' })
  categories: Category[];

  @Column('text')
  description: string;

  @Column({ default: false })
  is_featured: boolean;
}
