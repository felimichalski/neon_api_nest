import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text')
  items: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user' })
  @Column()
  user: number;

  @Column()
  phone: number;

  @Column()
  address: number;

  @Column()
  preferenceId: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'success' | 'failure';
}
