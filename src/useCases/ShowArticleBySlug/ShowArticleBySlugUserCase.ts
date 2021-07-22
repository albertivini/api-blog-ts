import { getCustomRepository } from "typeorm";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";



export class ShowArticleBySlugUserCase {

    async execute(slug: string) {

        const articleRepositories = getCustomRepository(ArticleRepositories)

        const busca = await articleRepositories.find({
            where: {
                slug: slug
            },
            relations: [
                "idUser"
            ]
        })

        if (!busca) {
            throw new Error("Artigo não encontrado.")
        }

        return busca
    }

}