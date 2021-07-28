import { createQueryBuilder, getCustomRepository } from "typeorm";
import { ArticleRepositories } from "../../repositories/ArticleRepositories";
import { FavoriteRepositories } from "../../repositories/FavoriteRepositories";
import { FollowRepositories } from "../../repositories/FollowRepositories";

export class ShowFeedUseCase {

    async execute(id: string) {

        const articleRepositories = getCustomRepository(ArticleRepositories)
        const favoriteRepositories = getCustomRepository(FavoriteRepositories)
        const followRepositories = getCustomRepository(FollowRepositories)

        const articles = await articleRepositories.query(`
        SELECT      articles.id, 
                    articles.slug, 
                    articles.title, 
		            articles.description, 
                    articles.body, 
                    articles.taglist as "taglist", 
                    articles.created_at, 
                    articles.updated_at, 
                    users.id as "userId", 
                    users.username, 
                    users.email, 
                    users.bio, 
                    users.image 
                    FROM articles
                    INNER JOIN follows ON articles.id_user = follows.id_seguido 
                    AND follows.id_segue = '${id}'
                    INNER JOIN users ON follows.id_seguido = users.id 
                    AND users.id = follows.id_seguido 
                    ORDER BY articles.created_at DESC`);
    
        return Promise.all(articles.map(async article => {

            const favoritesCount = await favoriteRepositories.count({
                where: {
                    idPost: article.id
                }
            })

            const searchFollow = await followRepositories.findOne({
                where: {
                    id_segue: id,
                    id_seguido: article.userId
                }
            })

            const searchFavorite = await favoriteRepositories.findOne({
                where: {
                    idPost: article.id,
                    idUser: id
                }
            })

            // if ternario
            const favorite = await searchFavorite ? true : false
            const follow = await searchFollow ? true: false


            return {
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                taglist: JSON.parse(article.taglist),
                createdAt: article.created_at,
                updatedAt: article.updated_at,
                favorited: favorite,
                favoritesCount: favoritesCount,
                author: {
                    username: article.username,
                    bio: article.bio,
                    image: article.image,
                    following: follow
                }
            }
        }))
    }
}