import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Support } from '../support/support.entity';
import { Todo } from '../todo/todo.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: null})
  type: string;

  @CreateDateColumn()
  create: Date;

  @ManyToMany(() => Todo, (todo) => todo.id)
  todo: Todo[];

  @ManyToMany(() => Todo, (todo) => todo.id)
  support: Support[];
}
