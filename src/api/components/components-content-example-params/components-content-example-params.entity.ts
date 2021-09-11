import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Components } from '../components.entity';
import { ComponentsContentExample } from '../components-content-example/components-content-example.entity';
import { User } from '../../user/user.entity';
import { TypeVarEnum } from '../../../interface/type-var.enum';
import { ComponentsExampleTypeEnum } from '../../../interface/components-example-type.enum';

@Entity()
export class ComponentsContentExampleParams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  name_params: string;

  @Column({ nullable: true })
  value: string;

  @ManyToOne(() => Components, (components) => components.id)
  componentsExample: ComponentsContentExample;

  @ManyToOne(() => Components, (components) => components.id)
  user: User;

  @Column({
    type: 'enum',
    enum: ComponentsExampleTypeEnum,
  })
  type_var: ComponentsExampleTypeEnum;
}
