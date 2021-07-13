import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User"
import { v4 as uuid } from "uuid"

@Entity("follows")

class Follow {

    @PrimaryColumn()
    id: string

    @JoinColumn({ name: "id_segue"})
    @ManyToOne(() => User)
    idSegue: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_seguido"})
    idSeguido: User

    constructor() {

        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Follow }