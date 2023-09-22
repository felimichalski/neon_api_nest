import { Payment } from 'src/payments/entities/payment.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  dni: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  province?: string;

  @Column({ nullable: true })
  postCode?: string;

  @OneToOne(() => Payment, (payment) => payment.client, {
    onDelete: 'CASCADE',
  })
  payment: Payment;
}
