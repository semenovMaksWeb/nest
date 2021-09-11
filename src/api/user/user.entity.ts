import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { JoinTable } from 'typeorm';
import { Token } from '../token/token.entity';
import { Todo } from '../todo/todo.entity';
import { Roles } from '../roles/roles.entity';
import { Chat } from '../chat/chat.entity';
import { Message } from '../message/message.entity';
import { ComponentsContentExampleParams } from '../components/components-content-example-params/components-content-example-params.entity';

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
  @JoinTable({ name: 'user_token' })
  token: Token[];

  @ManyToMany(() => Roles, (roles) => roles.id)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];

  @OneToMany(() => Todo, (todo) => todo.id)
  todo: Todo[];

  @OneToMany(() => Message, (message) => message.id)
  message: Message[];

  @OneToMany(() => Chat, (chat) => chat.id)
  chat: Chat;

  @OneToMany(
    () => ComponentsContentExampleParams,
    (componentsContentExampleParams) => componentsContentExampleParams.id,
  )
  components_example_params: ComponentsContentExampleParams;

  @ManyToMany(() => Chat, (chat) => chat.id)
  chatId: Chat[];
}
