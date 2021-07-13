import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { User } from "./User"
import { Article } from "./Article"

@Entity("comments")

class Comment {

    @PrimaryColumn()
    id: string

    @JoinColumn({ name: "id_user"})
    @ManyToOne(() => User)
    idUser: User

    @JoinColumn({ name: "id_article"})
    @ManyToOne(() => Article)
    idPost: Article

    @Column()
    body: string

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

export { Comment }