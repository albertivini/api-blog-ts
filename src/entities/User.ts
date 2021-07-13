import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid"
import { Article } from "./Article"

@Entity("users")
class User {

    @PrimaryColumn()
    id: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    bio: string

    @Column()
    image: string
    
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { User }