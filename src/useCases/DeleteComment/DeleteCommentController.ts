import { Request, Response } from "express";
import { DeleteCommentUseCase } from "./DeleteCommentUseCase";


export class DeleteCommentController {

    async handle(req: Request, res: Response) {
        try {
            const deleteCommentUseCase = new DeleteCommentUseCase()

            const { slug, id } = req.params
            const userId = req.userId
    
            const commentId = id
    
            await deleteCommentUseCase.execute({ slug, commentId, userId})
    
            return res.status(200).json({
                success: true,
                message: "Comentário Apagado"
            })
        } catch (err) {
            return res.status(404).json({
                success: false, 
                message: err.message
            })
        }
    }
}