import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Rights } from '../rights/rights.entity';
import { Router } from '../router/router.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  visible: boolean;

  @Column({ default: false })
  system: boolean;

  @CreateDateColumn()
  create: Date;

  @ManyToMany(() => User, (user) => user.id)
  user: User[];

  @ManyToMany(() => Rights, (rights) => rights.id)
  @JoinTable({ name: 'roles_rights' })
  rights: Rights[];
}
