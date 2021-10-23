import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from '../menu/menu.entity';
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

  @Column({ default: '' })
  description: string;

  @Column()
  authorization: boolean;

  @Column()
  defaultAuthorization: boolean;

  @Column({ default: false })
  checkAdmin: boolean;

  @Column({ default: false })
  usersRolesAll: boolean;

  @ManyToMany(() => Rights, (rights) => rights.id)
  @JoinTable({ name: 'router_rights' })
  rights: Rights[];


  @OneToOne(() => Menu, (menu) => menu.id)
  menu: Menu;
}
