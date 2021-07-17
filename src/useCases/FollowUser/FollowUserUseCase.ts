import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import { FollowRepositories } from "../../repositories/FollowRepositories"
import { getConnection } from "typeorm";
import { Follow } from "../../entities/Follow"
import { v4 as uuid } from "uuid"

interface IFollowUser {
    idUser: string
    username: string
}

export class FollowUserUseCase {

    async execute({idUser, username}: IFollowUser) {

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

        if ((id === idUser) || following) {
            throw new Error("Operação não permitida")
        }

        const follow = await    getConnection()
                                .createQueryBuilder()
                                .insert()
                                .into(Follow)
                                .values([
                                    { id: uuid(), id_segue: idUser as any, id_seguido: id as any}
                                ])
                                .execute();

        return perfil
    }

}