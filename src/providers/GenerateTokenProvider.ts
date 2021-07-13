import { sign } from "jsonwebtoken"

export class GenerateTokenProvider {

    async execute(userId: string) {

        const token = sign({
            userId
        }, "5e652d09b3dc4801a721a6ae013dcc21", {
            subject: userId,
            expiresIn: "5m",
        })

        return token
    }
    
}