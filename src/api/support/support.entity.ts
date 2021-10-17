import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { ContentHtml } from '../content-html/content-html.entity';

@Entity()
export class Support {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ContentHtml, (contentHtml) => contentHtml.id)
  contentHtml: ContentHtml;

  @Column({
    default: "вопрос к поддержке"
  })
  title: string;

  @Column({
    default: true
  })
  active: boolean;

  @CreateDateColumn()
  create: Date;

  @ManyToMany(() => Categories, (categories) => categories.id)
  @JoinTable({ name: 'support_categories' })
  categories: Categories[];

}
