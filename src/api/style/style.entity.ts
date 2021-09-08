import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StyleType } from '../style-type/style-type.entity';

@Entity()
export class Style {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(() => StyleType, (styleType) => styleType.id)
  type: StyleType;
}