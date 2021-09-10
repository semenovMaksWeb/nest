import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Components } from '../components.entity';
import { Style } from '../../style/style.entity';

@Entity()
export class ComponentsContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Components, (components) => components.id)
  components: Components;
}
