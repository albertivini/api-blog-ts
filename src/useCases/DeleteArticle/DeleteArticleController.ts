import { Request, Response } from "express";
import { DeleteArticleUserCase } from "./DeleteArticleUserCase";



export class DeleteArticleController {

    async handle (req: Request, res: Response) {

        try {
            const { slug } = req.params
            const userId = req.userId
    
            const deleteArticleUserCase = new DeleteArticleUserCase()
    
            await deleteArticleUserCase.execute( userId, slug )
    
            return res.status(200).json({
                success: false,
                message: "Publicação apagada."
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}