import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable({ name: 'chat_user' })
  userId: User[];
}
