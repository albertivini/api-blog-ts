import { Request, Response } from "express"
import { UpdateUserUseCase } from "./UpdateUserUseCase"


export class UpdateUserController {
    
    async handle(req: Request, res: Response) {
        try {
            const id = req.userId
            const token = req.headers.authorization.split(' ')[1]

            const { username, password, email, tagList, bio, image} = req.body

            const updateUserUseCase = new UpdateUserUseCase()

            const update = await updateUserUseCase.execute({ id, username, password, email, bio, image })

            const response = {
                "user": {
                    "email": update.email,
                    "token": token,
                    "username": update.username,
                    "bio": update.bio,
                    "image": update.image,
                }
            }

            return res.status(200).json(response)
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: err.message
            })
        }


    }
}