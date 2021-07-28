import { getCustomRepository } from "typeorm";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";
import { CommentRepositories } from "../../repositories/CommentRepositories";


export class ShowCommentUseCase {

    async execute(slug: string) {

        const articleRepositories = getCustomRepository(ArticleRepositories)

        const article = await articleRepositories.findOne({
            where: {
                slug
            }
        })

        if (!article) {
            throw new Error("Artigo não encontrado")
        }

        const { id } = article

        const commentRepositories = getCustomRepository(CommentRepositories)

        const comments = await commentRepositories.find({
            where: {
                idPost: id
            },
            relations: [
                "idUser"
            ]
        })

        if (!comments) {
            throw new Error("Artigo não tem comentários")
        }

        return comments.map(comment => {
            return {
                    id: comment.id,
                    body: comment.body,
                    createdAt: comment.created_at,
                    updatedAt: comment.updated_at,
                    author: {
                        username: comment.idUser.username,
                        bio: comment.idUser.bio,
                        image: comment.idUser.image
                    }
            }
        })
    }
}