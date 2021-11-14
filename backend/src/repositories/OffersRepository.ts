import { EntityRepository, Repository } from "typeorm";
import { Offer } from "../entity/Offer";

@EntityRepository(Offer)
class OffersRepository extends Repository<Offer> {}

export { OffersRepository };
