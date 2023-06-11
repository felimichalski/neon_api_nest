import { Type } from 'src/types/entities/type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => Type, { cascade: true })
  @JoinColumn({ name: 'type' })
  @Column()
  type: number;
}
