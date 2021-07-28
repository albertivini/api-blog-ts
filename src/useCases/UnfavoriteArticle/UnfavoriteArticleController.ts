import { Request, Response } from "express";
import { UnfavoriteArticleUseCase } from "./UnfavoriteArticleUseCase";


export class UnfavoriteArticleController {

    async handle (req: Request, res: Response) {
        try {
            const unfavoriteArticleUseCase = new UnfavoriteArticleUseCase()

            const { slug } = req.params
    
            const userId = req.userId
    
            const response = await unfavoriteArticleUseCase.execute(slug, userId)
    
            return res.status(200).json(response)
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}