import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import { FollowRepositories } from "../../repositories/FollowRepositories"

interface IShowProfile {
    userId: string
    username: string
}


export class ShowProfileUserCase {

    async execute({ userId, username }: IShowProfile) {

        const userRepositories = getCustomRepository(UserRepositories)
        const followRepositories = getCustomRepository(FollowRepositories)

        const perfil = await userRepositories.findOne({username})

        const { id } = perfil

        if (!perfil) {
            throw new Error("Usuário não encontrado")
        }

        if (id === userId) {

            const resposta = {
                "user": {
                    "username": perfil.username,
                    "bio": perfil.bio,
                    "image": perfil.image
                }
            }

            return resposta
        }

        const follow = await followRepositories.findOne({ 
            where: {
                id_segue: userId,
                id_seguido: id
            }
        })

        if (follow) {

            const resposta = {
                "user": {
                    "username": perfil.username,
                    "bio": perfil.bio,
                    "image": perfil.image,
                    "following": true
                }
            }

            return resposta
            
        } else {

            const resposta = {
                "user": {
                    "username": perfil.username,
                    "bio": perfil.bio,
                    "image": perfil.image,
                    "following": false
                }
            }

            return resposta
        }
    }
}