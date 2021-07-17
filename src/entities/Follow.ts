import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User"
import { v4 as uuid } from "uuid"

@Entity("follows")

class Follow {

    @PrimaryColumn()
    id: string

    @JoinColumn({name: "id_segue"})
    @ManyToOne(() => User)
    id_segue: User

    @JoinColumn({name: "id_seguido"})
    @ManyToOne(() => User)
    id_seguido: User

    constructor() {

        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Follow }