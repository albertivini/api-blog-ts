import validator from "validator"

interface IValidate {
    username: string
    email: string
    password: string
}


export class ValidateCreateProvider {

    async execute({ username, email, password }: IValidate) {

        if (validator.isAlphanumeric(username) && validator.isEmail(email) && !(validator.isEmpty(password))) return true

    }

}
