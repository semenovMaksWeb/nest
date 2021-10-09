import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Components } from '../components/components.entity';
import { TypeVarEnum } from '../../../interface/type-var.enum';

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

  @Column({
    type: 'enum',
    default: TypeVarEnum.string,
    enum: TypeVarEnum,
  })
  type_var: TypeVarEnum;
}
