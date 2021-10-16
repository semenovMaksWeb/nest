import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Support } from '../support/support.entity';
@Entity()
export class ContentHtml {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @OneToMany(() => Support, (support) => support.id)
  support: Support;
}
