import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComponentsVar } from './components-var/components-var.entity';

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
}
