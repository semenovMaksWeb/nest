import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StyleType } from './style-type/style-type.entity';
import { ComponentsVar } from '../components/components-var/components-var.entity';

@Entity()
export class Style {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(() => StyleType, (styleType) => styleType.id)
  typeId: StyleType;

  @OneToMany(() => ComponentsVar, (componentsVar) => componentsVar.id)
  components_var: ComponentsVar;
}
