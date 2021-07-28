import { Request, Response } from "express";
import { ShowCommentUseCase } from "./ShowCommentsUseCase";


export class ShowCommentsController {

    async handle(req: Request, res: Response) {
        try {
            const showCommentsUseCase = new ShowCommentUseCase()

            const { slug } = req.params
    
            const comments = await showCommentsUseCase.execute(slug)
    
            return res.status(200).json({comments})
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}