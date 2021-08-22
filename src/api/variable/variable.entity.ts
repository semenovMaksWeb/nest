import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Variable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  key: string;

  @Column({})
  value: string;
}
