import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { User } from "./User"

@Entity("articles")

class Article {

    @PrimaryColumn()
    id: string

    @JoinColumn({ name: "id_user"})
    @ManyToOne(() => User)
    idUser: User

    @Column()
    slug: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    body: string

    @Column()
    taglist: string
    
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {

        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Article }