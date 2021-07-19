import { Request, Response } from "express";
import { ShowProfileUserCase } from "./ShowProfileUserCase";


export class ShowProfileController {

    async handle (req: Request, res: Response) {
        try {

            const showProfileUserCase = new ShowProfileUserCase()

            const userId = req.userId
    
            const { username } = req.params
    
            const results = await showProfileUserCase.execute({ userId, username})
    
            return res.status(200).json(results)

        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}