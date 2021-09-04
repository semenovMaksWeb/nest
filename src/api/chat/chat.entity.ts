import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => User, (user) => user.id)
  message: Message[];

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable({ name: 'chat_user' })
  userId: User[];
}
