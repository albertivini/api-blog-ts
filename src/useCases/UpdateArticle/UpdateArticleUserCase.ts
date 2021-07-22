import { getCustomRepository } from "typeorm"
import { ArticleRepositories } from "../../repositories/ArticleRepositories"
import { getConnection } from "typeorm"
import { Article } from "../../entities/Article"
import { CreateSlugProvider } from "../../providers/CreateSlugProvider"
import validator from "validator"


interface IUpdateArticle {
    userId: string
    slug: string
    title: string
    body: string
    description: string
    taglist: string[],
}

export class UpdateArticleUserCase {

    async execute({userId, slug, title, body, description, taglist}: IUpdateArticle) {

        if (!(validator.isEmpty(title)) && !(validator.isEmpty(body)) && !(validator.isEmpty(description)) && taglist.length === 0) {
            throw new Error("Algum campo está em branco.")
        }

        const articleRepositories = getCustomRepository(ArticleRepositories)

        const busca = await articleRepositories.findOne({
            where: {
                idUser: userId,
                slug: slug
            }
        })

        if (!busca) {
            throw new Error("Artigo não encontrado.")
        }

        const createSlugProvider = new CreateSlugProvider()

        const newSlug = await createSlugProvider.execute(title)
        const taglistString = JSON.stringify(taglist)

        await   getConnection()
                .createQueryBuilder()
                .update(Article)
                .set({
                    body: body,
                    description: description,
                    slug: newSlug,
                    title: title,
                    taglist: taglistString,
                })
                .where("idUser = :userId and slug = :slug", {
                    userId: userId,
                    slug: slug
                })
                .execute();

        const article = await articleRepositories.findOne({
            where: {
                slug: newSlug,
                idUser: userId
            },
            relations: [
                "idUser"
            ]
        })

        // FAZER MÉTODO DE CONTAR FAVORITOS

        return article
        
    }
}