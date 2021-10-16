import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { ContentHtml } from '../content-html/content-html.entity';

@Entity()
export class Support {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ContentHtml, (contentHtml) => contentHtml.id)
  contentHtml: ContentHtml;

  @Column({
    default: true
  })
  active: boolean;

  @CreateDateColumn()
  create: Date;
}
