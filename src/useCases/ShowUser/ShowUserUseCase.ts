import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"


export class ShowUserUseCase {

    async execute(id: string) {

        const userRepositories = getCustomRepository(UserRepositories)

        const data = await userRepositories.findOne({ id })

        return data
    }
}