import { Request, Response } from "express";
import { UpdateArticleUserCase } from "./UpdateArticleUserCase";


export class UpdateArticleController {

    async handle (req: Request, res: Response) {
        try {
            const updateArticleUserCase = new UpdateArticleUserCase()

            const { slug } = req.params
            const { title, body, description, taglist } = req.body
            const userId = req.userId
    
            const article = await updateArticleUserCase.execute({ slug, userId, title, body, description, taglist })
    
            return res.status(202).json({
                article: {
                    "slug": article.slug,
                    "title": article.title,
                    "description": article.description,
                    "body": article.body,
                    "taglist": JSON.parse(article.taglist),
                    "createdAt": article.created_at,
                    "updatedAt": article.updated_at,
                    "favoritesCount": "ainda vou fazer",
                    "author": {
                        "username": article.idUser.username,
                        "bio": article.idUser.bio,
                        "image": article.idUser.image 
                    }
                }
            })
        } catch (err) {
            return res.status(406).json({
                success: false,
                message: err.message
            })
        }

    }
}
