import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"


interface IPayload {
    sub: string
}

export function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization.split(' ')[1]

    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }

    try {
        const { sub } = verify(authToken, "5e652d09b3dc4801a721a6ae013dcc21") as IPayload

        req.userId = sub

        return next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid token"})
    }
    
}
