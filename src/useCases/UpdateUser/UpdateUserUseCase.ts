import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import validator from "validator"

interface IUpdateUser {
    id: string
    username: string
    email: string
    password: string
    bio: string
    image: string
}


export class UpdateUserUseCase {

    async execute({ id, username, email, password, bio, image }: IUpdateUser) {

        if (!(validator.isAlphanumeric(username) && validator.isEmail(email) && !(validator.isEmpty(password)))) {
            throw new Error("Dados inseridos estão inválidos")
        }

        const userRepositories = getCustomRepository(UserRepositories)

        await userRepositories.update({
            id
        }, {
            username, 
            email, 
            password,
            bio,
            image,
        })

        const update = await userRepositories.findOne({id})
        
        return update

    }

}