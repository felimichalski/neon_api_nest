import {
  AfterRemove,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { Mediafile } from 'src/mediafiles/entities/mediafile.entity';

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

  @Column('float')
  unit_price: number;

  @ManyToOne(() => Size, { cascade: true })
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
