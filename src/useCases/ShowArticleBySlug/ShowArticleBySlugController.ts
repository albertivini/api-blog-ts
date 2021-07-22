import { Request, Response } from "express";
import { ShowArticleBySlugUserCase } from "./ShowArticleBySlugUserCase";

export class ShowArticleBySlugController {

    async handle (req: Request, res: Response) {

        try {
            const showArticleBySlugUserCase = new ShowArticleBySlugUserCase()

            const { slug } = req.params
    
            const data = await showArticleBySlugUserCase.execute(slug)
    
            const article = data.map(art => {
                    return {
                        slug: art.slug,
                        title: art.title,
                        description: art.description,
                        body: art.body,
                        taglist: JSON.parse(art.taglist),
                        createdAt: art.created_at,
                        updatedAt: art.updated_at,
                        author: {
                            username: art.idUser.username,
                            bio: art.idUser.bio,
                            image: art.idUser.image
                        }
                    }
                })
            
            return res.status(200).json({article})

        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}