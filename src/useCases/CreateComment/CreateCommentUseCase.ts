import { getConnection, getCustomRepository } from "typeorm";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";
import { CommentRepositories } from "../../repositories/CommentRepositories";
import { Comment } from "../../entities/Comment"
import { v4 as uuid } from "uuid"
import validator from "validator"

interface ICreateComment {
    userId: string
    body: string
    slug: string
}

export class CreateCommentUseCase {

    async execute({userId, body, slug}: ICreateComment) {

        const articleRepositories = getCustomRepository(ArticleRepositories)
        
        const searchPost = await articleRepositories.findOne({
            where: {
                slug
            },
            relations: [
                "idUser"
            ]
        })
        
        if (!searchPost) {
            throw new Error("Artigo não encontrado")
        }
        
        if (validator.isEmpty(body)) {
            throw new Error("Comentário não pode estar vazio")
        }

        const { id } = searchPost

        const { generatedMaps } = await   getConnection()
                                .createQueryBuilder()
                                .insert()
                                .into(Comment)
                                .values([
                                    { 
                                        id: uuid(), 
                                        idUser: userId as any, 
                                        idPost: id as any,
                                        body: body
                                    }
                                ])
                                .execute();

        return {
            comment: {
                id: generatedMaps[0].id,
                createdAt: generatedMaps[0].created_at,
                updatedAt: generatedMaps[0].updated_at,
                body: body,
                author: {
                    username: searchPost.idUser.username,
                    bio: searchPost.idUser.bio,
                    image: searchPost.idUser.image
                }
            }
        }
    }
}

