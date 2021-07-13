import { EntityRepository, Repository } from "typeorm"
import { Article } from "../entities/Article"

@EntityRepository(Article)

export class ArticleRepositories extends Repository<Article> {

}

