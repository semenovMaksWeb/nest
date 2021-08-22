import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../roles/roles.entity';

@Entity()
export class Router {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  key: string;

  @Column({})
  name: string;

  @Column({})
  type: string;

  @ManyToMany(() => Roles, (roles) => roles.id)
  @JoinTable({ name: 'router_roles' })
  roles: Roles[];
}
