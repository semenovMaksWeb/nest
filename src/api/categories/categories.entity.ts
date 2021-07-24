import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Todo } from '../todo/todo.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  create: Date;

  @ManyToMany(() => Todo, (todo) => todo.id)
  todo: Todo[];
}
