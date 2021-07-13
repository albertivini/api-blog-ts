import { EntityRepository, Repository } from "typeorm"
import { Follow } from "../entities/Follow"

@EntityRepository(Follow)

export class FollowRepositories extends Repository<Follow> {

}

