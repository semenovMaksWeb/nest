import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rights } from '../rights/rights.entity';

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

  @ManyToMany(() => Rights, (rights) => rights.id)
  @JoinTable({ name: 'router_rights' })
  roles: Rights[];
}
