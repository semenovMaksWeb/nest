import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { JoinTable } from 'typeorm/browser';
import { Categories } from '../categories/categories.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  text: string;

  @CreateDateColumn()
  create: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToMany(() => Categories, (categories) => categories.id)
  @JoinTable()
  categories: Categories[];
}
