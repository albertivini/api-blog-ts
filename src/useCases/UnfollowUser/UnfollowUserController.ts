import { Request, Response } from "express"
import { UnfollowUserUseCase } from "./UnfollowUserUseCase"

export class UnfollowUserController {

    async handle(req: Request, res: Response) {
        try{
            const { username } = req.params
            const idUser = req.userId
    
            const unfollowUserUseCase = new UnfollowUserUseCase()
    
            const unfollow = await unfollowUserUseCase.execute({ idUser, username })
    
            return res.status(200).json({
                user: {
                    username: unfollow.username,
                    bio: unfollow.bio,
                    image: unfollow.image,
                    following: false
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