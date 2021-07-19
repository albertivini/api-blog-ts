import { Request, Response } from "express";
import { CreateArticleUserCase } from "./CreateArticleUserCase";


export class CreateArticleController {

    async handle (req: Request, res: Response) {
        try {
            const createArticleUserCase = new CreateArticleUserCase()

            const {
                title,
                body,
                description,
                taglist,
            } = req.body
    
            const userId = req.userId
    
            await createArticleUserCase.execute({ userId, title, body, description, taglist })
    
            return res.status(200).json({
                success: true,
                message: "Publicação feita."
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}