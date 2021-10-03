import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ContentHtml {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;
}
