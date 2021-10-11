import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
 
  } from 'typeorm';
import { ContentHtml } from '../content-html/content-html.entity';



@Entity()
export class Support{
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(()=> ContentHtml, (contentHtml)=> contentHtml.id)
  contentHtml: ContentHtml
}