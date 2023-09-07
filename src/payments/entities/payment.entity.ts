import { Client } from 'src/client/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  products: string;

  @Column()
  shipping: boolean;

  @OneToOne(() => Client, { cascade: true })
  @JoinColumn({ name: 'client' })
  @Column()
  client: Client;

  @Column()
  preferenceId?: string;

  @Column({ default: 'pending' })
  status?: 'pending' | 'success' | 'failure';
}
