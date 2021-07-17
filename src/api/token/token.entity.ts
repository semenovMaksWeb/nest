import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from 'src/api/user/user.entity';
@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'text' })
  value: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @ManyToMany(() => User, (user) => user.id)
  user: User[];
}
