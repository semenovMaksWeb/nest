import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { JoinTable } from 'typeorm/browser';
import { Token } from '../token/token.entity';
import { Todo } from '../todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true, nullable: false })
  active: boolean;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  nik: string;

  @CreateDateColumn()
  create: Date;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Token, (token) => token.id)
  @JoinTable()
  user: Token[];

  @OneToMany(() => Todo, (todo) => todo.id)
  todo: Todo[];
}
