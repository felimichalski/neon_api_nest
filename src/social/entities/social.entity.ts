import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  url: string;
}
