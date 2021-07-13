import { EntityRepository, Repository } from "typeorm"
import { Comment } from "../entities/Comment"

@EntityRepository(Comment)

export class CommentRepositories extends Repository<Comment> {

}

