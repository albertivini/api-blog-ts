import { getConnection, getCustomRepository } from "typeorm"
import { Favorite } from "../../entities/Favorite"
import { ArticleRepositories } from "../../repositories/ArticleRepositories"
import { FavoriteRepositories } from "../../repositories/FavoriteRepositories"
import { FollowRepositories } from "../../repositories/FollowRepositories"


export class UnfavoriteArticleUseCase {

    async execute (slug: string, userId: string) {


        const articleRepositories = getCustomRepository(ArticleRepositories)

        const searchArticle = await articleRepositories.findOne({
            where: {
                slug: slug
            },
            relations: [
                "idUser"
            ]
        })

        if (!searchArticle) {
            throw new Error("Artigo não encontrado")
        }

        const favoriteRepositories = getCustomRepository(FavoriteRepositories)

        const { id } = searchArticle

        const PostAlreadyFavorited = await favoriteRepositories.findOne({
            where: {
                idPost: id,
                idUser: userId
            }
        })

        if (!PostAlreadyFavorited) {
            throw new Error("Artigo não está favoritado")
        }

        await   getConnection()
                .createQueryBuilder()
                .delete()
                .from(Favorite)
                .where("idUser = :userId", { userId: userId })
                .andWhere("idPost = :idPost", { idPost: id })
                .execute()

        
                const count = await favoriteRepositories.count({
                    where: {
                        idPost: id
                    }
                })
        
                const followRepositories = getCustomRepository(FollowRepositories)
                
                const searchFollow = await followRepositories.findOne({
                    where: {
                        id_segue: userId,
                        id_seguido: searchArticle.idUser
                    }
                })
        
                const follow = searchFollow ? true : false
        
                return {
                    article: {
                        slug: searchArticle.slug,
                        title: searchArticle.title,
                        description: searchArticle.description,
                        body: searchArticle.body,
                        taglist: JSON.parse(searchArticle.taglist),
                        createdAt: searchArticle.created_at,
                        updatedAt: searchArticle.updated_at,
                        favorited: false,
                        favoritesCount: count,
                        author: {
                            username: searchArticle.idUser.username,
                            bio: searchArticle.idUser.bio,
                            image: searchArticle.idUser.image,
                            following: follow
                        }
                    }
                }
    }
}