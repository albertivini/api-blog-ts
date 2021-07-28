import { getCustomRepository } from "typeorm";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";
import { FavoriteRepositories } from "../../repositories/FavoriteRepositories";

export class ShowAllArticlesUseCase {

    async execute () {
        const articleRepositories = getCustomRepository(ArticleRepositories)
        const favoriteRepositories = getCustomRepository(FavoriteRepositories)

        const busca = await articleRepositories.find({
            relations: [
                "idUser"
            ]
        })

        const dados = Promise.all(busca.map(async dado => {

            const count = await favoriteRepositories.count({
                where: {
                    idPost: dado.id
                }
            })
            
            return {
                slug: dado.slug,
                title: dado.title,
                description: dado.description,
                body: dado.body,
                taglist: JSON.parse(dado.taglist),
                createdAt: dado.created_at,
                updatedAt: dado.updated_at,
                favoritesCount: count,
                author: {
                    username: dado.idUser.username,
                    bio: dado.idUser.bio,
                    image: dado.idUser.image
                }
            }
        }))

        return dados

    }
}