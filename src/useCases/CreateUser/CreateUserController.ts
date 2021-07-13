import { Request, Response } from "express"
import { CreateUserUseCase } from "./CreateUserUseCase"

export class CreateUserController {

    async handle(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body

            const createUserUseCase = new CreateUserUseCase()

            await createUserUseCase.execute({ username, email, password })

            return res.status(201).json({ success: true })

        } catch (err) {

            return res.status(401).json({
                success: false,
                message: err.message
            })

        }
    }
}
