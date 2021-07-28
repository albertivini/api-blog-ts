import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { User } from "./User"
import { Article } from "./Article"


@Entity("favorites")

class Favorite {

    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: "id_article"})
    @ManyToOne(() => Article)
    idPost: Article

    @JoinColumn({ name: "id_user"})
    @ManyToOne(() => User)
    idUser: User

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Favorite }