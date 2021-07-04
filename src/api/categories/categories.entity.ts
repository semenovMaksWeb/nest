import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { JoinTable } from 'typeorm/browser';
import { Todo } from '../todo/todo.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  create: Date;

  @ManyToMany(() => Todo, (todo) => todo.id)
  @JoinTable()
  todo: Todo[];
}
