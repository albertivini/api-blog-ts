import { getConnection, getCustomRepository } from "typeorm";
import { Comment } from "../../entities/Comment";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";
import { CommentRepositories } from "../../repositories/CommentRepositories";


interface IDeleteComment {
    slug: string
    userId: string,
    commentId: string
}

export class DeleteCommentUseCase {
    
    async execute({ slug, userId, commentId}: IDeleteComment) {

        const articleRepositories = getCustomRepository(ArticleRepositories)

        const searchSlug = await articleRepositories.findOne({
            where: {
                slug: slug
            }
        })

        if (!searchSlug) {
            throw new Error("Artigo não encontrado")
        }

        const commentRepositories = getCustomRepository(CommentRepositories)

        const searchComment = await commentRepositories.findOne({
            where: {
                id: commentId
            },
            relations: [
                "idPost",
                "idUser"
            ]
        })

        if (!searchComment) {
            throw new Error("Comentário não encontrado")
        }

        const { id } = searchComment.idUser

        if (id !== userId) {
            throw new Error("Comentário não pertence ao usuário")
        }

        await   getConnection()
                .createQueryBuilder()
                .delete()
                .from(Comment)
                .where("id = :commentId", { commentId: commentId })
                .andWhere("id_article = :idPost", { idPost: searchComment.idPost.id})
                .andWhere("id_user = :idUser", { idUser: userId })
                .execute()

        return

    }
}