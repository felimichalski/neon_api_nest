import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';

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

  @Column()
  size: string;

  @Column()
  color: boolean;

  @ManyToOne(() => Category, { cascade: true })
  @JoinColumn({ name: 'category' })
  @Column({ default: 1 })
  category: number;

  @Column('text')
  description: string;

  @Column({ default: false })
  isFeatured: boolean;
}
