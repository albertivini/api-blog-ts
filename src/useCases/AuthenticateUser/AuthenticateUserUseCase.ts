import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import { compare } from "bcryptjs"
import { ValidateLoginProvider } from "../../providers/ValidateLoginProvider"
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider"

interface IAuthenticateUser {
    email: string
    password: string
}

export class AuthenticateUserUseCase {

    async execute({ email, password }: IAuthenticateUser) {

        const validateLoginProvider = new ValidateLoginProvider()
        
        const validate = validateLoginProvider.execute({ email, password })

        if (!validate) {
            throw new Error("Dados inseridos estão inválidos")
        }

        const userRepositores = getCustomRepository(UserRepositories)

        const user = await userRepositores.findOne({ email })

        if (!user) {
            throw new Error("Usuário ou senha incorretos")
        }

        const MatchPassword = await compare(password, user.password)

        if (!MatchPassword) {
            throw new Error("Usuário ou senha incorretos")
        }

        const { id } = user

        const generateTokenProvider = new GenerateTokenProvider()

        const token = generateTokenProvider.execute(id)

        return token
    }
}