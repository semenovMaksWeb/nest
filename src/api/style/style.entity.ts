import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Style {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: false, unique: true })
  name: string;
}
