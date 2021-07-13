import { EntityRepository, Repository } from "typeorm"
import { Favorite } from "../entities/Favorite"

@EntityRepository(Favorite)

export class FavoriteRepositories extends Repository<Favorite> {

}

