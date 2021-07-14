import { Request, Response } from "express"
import { ShowUserUseCase } from "./ShowUserUseCase"

export class ShowUserController {

    async handle (req: Request, res: Response) {
        try {

            const id = req.userId
            const token = req.headers.authorization.split(' ')[1]
    
            const showUserUseCase = new ShowUserUseCase()
    
            const data = await showUserUseCase.execute(id)
    
            const response = {
                "user": {
                    "email": data.email,
                    "token": token,
                    "username": data.username,
                    "bio": data.bio,
                    "image": data.image
                }
            }
    
            return res.status(200).json(response)
    
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }
    }
}