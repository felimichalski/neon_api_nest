import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { Size } from 'src/sizes/entities/size.entity';
import { Color } from 'src/colors/entities/color.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column('float')
  unit_price: number;

  @ManyToMany(() => Size, { cascade: true })
  @JoinTable()
  sizes: Size[];

  @ManyToMany(() => Color, { cascade: true })
  @JoinTable()
  colors: Color[];

  @ManyToOne(() => Category, { cascade: true })
  @JoinColumn({ name: 'category' })
  @Column({ default: 1 })
  category: Category;

  @Column('text')
  description: string;

  @Column({ default: false })
  is_featured: boolean;
}
