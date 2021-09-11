import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComponentsVar } from '../components-var/components-var.entity';
import { ComponentsExample } from '../components-example/components-example.entity';
import { ComponentsContent } from '../components-content/components-content.entity';

@Entity()
export class Components {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ComponentsVar, (componentsVar) => componentsVar.id)
  components_var: ComponentsVar;

  @OneToMany(
    () => ComponentsContent,
    (componentsContent) => componentsContent.id,
  )
  components_content: ComponentsContent;

  @OneToMany(() => ComponentsVar, (componentsVar) => componentsVar.id)
  components_example: ComponentsExample;
}
