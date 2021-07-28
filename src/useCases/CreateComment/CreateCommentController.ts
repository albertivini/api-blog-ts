import { Request, Response } from "express";
import { CreateCommentUseCase } from "./CreateCommentUseCase";



export class CreateCommentController {

    async handle (req: Request, res: Response) {
        try {
            const createCommentUseCase = new CreateCommentUseCase()

            const { slug } = req.params
            const { body } = req.body
            const userId = req.userId
    
            const create = await createCommentUseCase.execute({ slug, body, userId})
    
            return res.status(200).json(create)
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}