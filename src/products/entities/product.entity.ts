import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { Color } from 'src/colors/entities/color.entity';
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

  @ManyToMany(() => Size, { cascade: true })
  @JoinTable()
  sizes: Size[];

  @Column()
  color: boolean;

  @ManyToOne(() => Category, { cascade: true })
  @JoinColumn({ name: 'category' })
  @Column({ default: 1 })
  category: Category;

  @Column('text')
  description: string;

  @Column({ default: false })
  is_featured: boolean;
}
