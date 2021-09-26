import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Components } from '../components/components.entity';
import { ComponentsExample } from '../components-example/components-example.entity';
import { User } from '../../user/user.entity';
import { ComponentsExampleTypeEnum } from '../../../interface/components-example-type.enum';

@Entity()
export class ComponentsContentExampleParams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name_params: string;

  @Column({ nullable: true })
  value: string;

  @ManyToOne(() => Components, (components) => components.id)
  componentsExample: ComponentsExample;

  @ManyToOne(() => Components, (components) => components.id)
  user: User;

  @Column({
    type: 'enum',
    enum: ComponentsExampleTypeEnum,
  })
  type_var: ComponentsExampleTypeEnum;
  @Column({
    nullable: true,
  })
  elemId: number;
}
