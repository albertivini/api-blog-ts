import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

export class AuthenticateUserController {

    async handle(req: Request, res: Response) {

        try {
            const { email, password } = req.body

            const authenticateUserUseCase = new AuthenticateUserUseCase()
    
            const token = await authenticateUserUseCase.execute({ email, password })
    
            return res.status(202).json({ 
                auth: true,
                token: token
            })
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: err.message
            })
        }
    }
}