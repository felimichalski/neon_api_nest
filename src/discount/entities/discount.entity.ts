import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  code: string;

  @Column({ enum: ['percentage', 'price'], default: 'percentage' })
  type: string;

  @Column()
  reusable: boolean;

  @Column({ nullable: true })
  max: number;
}
