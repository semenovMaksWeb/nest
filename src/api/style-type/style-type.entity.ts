import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StyleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  enum: string;
}
