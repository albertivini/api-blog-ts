import { getCustomRepository } from "typeorm";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";
import { getConnection } from "typeorm"
import { Article } from "../../entities/Article";

export class DeleteArticleUserCase {

    async execute(userId: string, slug: string) {


        const articleRepositories = getCustomRepository(ArticleRepositories)

        const busca = await articleRepositories.findOne({
            where: {
                idUser: userId,
                slug: slug
            }
        })

        if (!busca) {
            throw new Error("Artigo não encontrado")
        }

        await   getConnection()
                .createQueryBuilder()
                .delete()
                .from(Article)
                .where("slug = :slug and idUser = :userId", { slug: slug, userId: userId })
                .execute()

        return
    }
}