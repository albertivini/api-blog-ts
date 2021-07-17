import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import { FollowRepositories } from "../../repositories/FollowRepositories"
import { getConnection } from "typeorm";
import { Follow } from "../../entities/Follow"

interface IUnfollowUser {
    idUser: string
    username: string
}

export class UnfollowUserUseCase {
    
    async execute({ idUser, username }: IUnfollowUser) {

        const userRepositories = getCustomRepository(UserRepositories)
        const followRepositories = getCustomRepository(FollowRepositories)

        const perfil = await userRepositories.findOne({ username })

        if (!perfil) {
            throw new Error("Usuário não encontrado")
        }

        const { id } = perfil

        const following = await followRepositories.findOne({ 
            where: { 
                id_segue: idUser,
                id_seguido: id
            }
        })

        if ((id === idUser) || !(following)) {
            throw new Error("Operação não permitida")
        }

        await followRepositories.query(` DELETE from follows WHERE id_segue='${idUser}' AND id_seguido='${id}'`) 

        return perfil

    }
}

