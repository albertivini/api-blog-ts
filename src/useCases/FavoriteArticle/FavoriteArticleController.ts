import { Request, Response } from "express";
import { FavoriteArticleUseCase } from "./FavoriteArticleUseCase";


export class FavoriteArticleController {

    async handle (req: Request, res: Response) {
        try {
            const favoriteArticleUseCase = new FavoriteArticleUseCase()

            const { slug } = req.params
    
            const userId = req.userId
    
            const response = await favoriteArticleUseCase.execute(slug, userId)
    
            return res.status(200).json(response)
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}