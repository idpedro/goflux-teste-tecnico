import { EntityRepository, Repository } from "typeorm";
import { Proposal } from "../entity/Proposal";

@EntityRepository(Proposal)
class ProposalsRepository extends Repository<Proposal> {}

export { ProposalsRepository };
