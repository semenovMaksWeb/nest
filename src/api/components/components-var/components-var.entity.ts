import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Components } from '../components.entity';
import { Style } from '../../style/style.entity';

@Entity()
export class ComponentsVar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
    description: string;

  @Column({ nullable: false, unique: true })
  var_name: string;

  @Column({ nullable: true })
  value_default: string;

  @ManyToOne(() => Components, (components) => components.id)
  components: Components;

  @ManyToOne(() => Components, (components) => components.id)
  style: Style;
}
