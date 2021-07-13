import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import { hash } from "bcryptjs"
import { ValidateCreateProvider } from "../../providers/ValidateCreateProvider"

interface ICreateUser {

    username: string
    email: string
    password: string

}


export class CreateUserUseCase {

    async execute({ username, email, password}: ICreateUser) {
        const userRepositories = getCustomRepository(UserRepositories)

        const validateCreateProvider = new ValidateCreateProvider()

        const validate = validateCreateProvider.execute({ username, email, password })

        if (!validate) {
            throw new Error("Algum campo está em desacordo ou está vazio.")
        }

        const UserAlreadyExists = await userRepositories.findOne({ email })
        
        if (UserAlreadyExists) {
            throw new Error("Usuário já cadastrado")
        }

        const SearchUsername = await userRepositories.findOne({ username })

        if (SearchUsername) {
            throw new Error("Username já está em uso")
        }

        const HashPassword = await hash(password, 10)

        const user = userRepositories.create({
            username,
            email,
            password: HashPassword
        })

        await userRepositories.save(user)

        return
    }

}