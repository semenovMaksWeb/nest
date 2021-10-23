import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Router } from "../router/router.entity";

@Entity()
export class Menu{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column()
    parent: number;


    @OneToOne(() => Router, (router) => router.id)
    router: Router;
}