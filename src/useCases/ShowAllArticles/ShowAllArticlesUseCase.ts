import { getCustomRepository } from "typeorm";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";

export class ShowAllArticlesUseCase {

    async execute () {
        const articleRepositories = getCustomRepository(ArticleRepositories)

        const busca = await articleRepositories.find({
            relations: [
                "idUser"
            ]
        })

        const dados = busca.map(dado => {
            return {
                slug: dado.slug,
                title: dado.title,
                description: dado.description,
                body: dado.body,
                taglist: JSON.parse(dado.taglist),
                createdAt: dado.created_at,
                updatedAt: dado.updated_at,
                favoritesCount: "ainda vou fazer",
                author: {
                    username: dado.idUser.username,
                    bio: dado.idUser.bio,
                    image: dado.idUser.image
                }
            }
        })

        return dados

    }
}