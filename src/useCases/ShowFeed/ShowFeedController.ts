import { Request, Response } from "express";
import { ShowFeedUseCase } from "./ShowFeedUseCase";


export class ShowFeedController {

    async handle (req: Request, res: Response) {
        try {
            const id = req.userId
    
            const showFeedUseCase = new ShowFeedUseCase()
    
            const articles = await showFeedUseCase.execute(id)
        
            return res.status(200).json({articles})
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

    }
}