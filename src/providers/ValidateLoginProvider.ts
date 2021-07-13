import validator from "validator"

interface IValidate {
    email: string
    password: string
}

export class ValidateLoginProvider {

    async execute({ email, password }: IValidate) {

        if (validator.isEmail(email) && !(validator.isEmpty(password))) return true

    }
}
