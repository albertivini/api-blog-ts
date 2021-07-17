import { Request, Response } from "express"
import { FollowUserUseCase } from "./FollowUserUseCase"

export class FollowUserController {

    async handle (req: Request, res: Response) {
        try {
            const { username } = req.params
            const idUser = req.userId
    
            const followUserUseCase = new FollowUserUseCase()
    
            const follow = await followUserUseCase.execute({ idUser, username })
    
            return res.status(200).json({
                user: {
                    username: follow.username,
                    bio: follow.bio,
                    image: follow.image,
                    following: true
                }
            })
        } catch (err) {
            return res.status(405).json({
                success: false,
                message: err.message
            })
        }

    }
}