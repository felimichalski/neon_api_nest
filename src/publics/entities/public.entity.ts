import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Public {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}
