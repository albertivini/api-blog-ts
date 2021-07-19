import { CreateSlugProvider } from "../../providers/CreateSlugProvider"
import { getConnection } from "typeorm"
import { Article } from "../../entities/Article"
import { v4 as uuid } from "uuid"
import validator from "validator"

interface ICreateArticle {
    userId: string
    title: string
    body: string
    description: string
    taglist: string[],
}

export class CreateArticleUserCase {

    async execute({ userId, title, body, description, taglist }: ICreateArticle) {

        if (!(validator.isEmpty(title)) && !(validator.isEmpty(body)) && !(validator.isEmpty(description)) && taglist.length === 0) {
            throw new Error("Algum campo está em branco.")
        }

        const createSlugProvider = new CreateSlugProvider()

        const taglistString = JSON.stringify(taglist)
        const createSlug = await createSlugProvider.execute(title)

        const article = await    getConnection()
                                .createQueryBuilder()
                                .insert()
                                .into(Article)
                                .values([
                                    { 
                                        id: uuid(), 
                                        idUser: userId as any, 
                                        title: title,
                                        slug: createSlug,
                                        body: body,
                                        description: description,
                                        taglist: taglistString
                                    }
                                ])
                                .execute();

        return
    }
}