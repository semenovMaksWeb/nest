import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Style } from '../style.entity';

@Entity()
export class StyleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  enum: string;

  @OneToMany(() => Style, (style) => style.id)
  style_id: Style;
}
