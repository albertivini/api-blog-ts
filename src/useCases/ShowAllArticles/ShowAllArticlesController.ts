import { Request, Response } from "express";
import { ShowAllArticlesUseCase } from "./ShowAllArticlesUseCase";



export class ShowAllArticlesController {

    async handle (req: Request, res: Response) {
        try {
            const showAllArticlesUseCase = new ShowAllArticlesUseCase()

            const articles = await showAllArticlesUseCase.execute()
    
            return res.status(200).json({articles})
    
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}