import { FindManyOptions, getCustomRepository, Like } from "typeorm";
import { Request, Response } from "express";
import JWTServices from "../services/jwt";

import { ProposalFactory } from "../factories/ProposalFactory";
import { Proposal, StatusProposalsEnum } from "./../entity/Proposal";
import { ProposalsRepository } from "../repositories/ProposalsRepository";

import { UserRepository } from "../repositories/UserRepository";
import { OffersRepository } from "../repositories/OffersRepository";
import { User, UserType } from "../entity/User";
import { StatusOffersEnum } from "./../entity/Offer";

type Optional<T> = {
  [P in keyof Required<T>]?: T[P];
};

class ProposalController {
  private getUser(request: Request) {
    const payload = JWTServices.getPayload(request);
    if (!payload) throw new Error("Usuário não autenticado");
    const { user } = payload;
    return user;
  }

  async index(request: Request, response: Response) {
    const { page, itensPerPage } = request.query;
    const take = itensPerPage ? Number(itensPerPage) : 10;
    const skip = page && Number(page) > 1 ? Number(page) * take : 0;
    let user;
    try {
      user = this.getUser(request);
    } catch (error: any) {
      return response
        .status(401)
        .json({ errors: [{ message: error.message }] });
    }

    const findOptions: FindManyOptions<Proposal> = {
      take,
      relations: ["user", "offer"],
      skip,
    };
    if (user.type === UserType.PROVIDER) {
      findOptions.where = { user: user.id };
    }
    try {
      const proposalRepository = getCustomRepository(ProposalsRepository);
      const proposals = await proposalRepository.findAndCount(findOptions);
      return response.json(proposals);
    } catch (error) {
      return response.status(500).json({
        errors: [{ message: "Não foi possivel  pegar os registros" }],
      });
    }
  }

  async create(request: Request, response: Response) {
    let user;
    try {
      user = this.getUser(request);
    } catch (error: any) {
      return response
        .status(401)
        .json({ errors: [{ message: error.message }] });
    }

    const { offer, ...proposal } = request.body;

    let newProposal;
    try {
      newProposal = await ProposalFactory(proposal);
    } catch (error) {
      return response.status(400).json(error);
    }

    const proposalsRepository = getCustomRepository(ProposalsRepository);
    const offersRepository = getCustomRepository(OffersRepository);
    const userRepository = getCustomRepository(UserRepository);

    try {
      const findUser = await userRepository.findOne(
        { id: user.id },
        { select: ["id", "name"] }
      );
      if (!findUser)
        return response.status(401).json({ messge: "Usuário não encontrado" });

      const findOffer = await offersRepository.findOne(offer);
      if (!findOffer)
        return response.status(401).json({ messge: "Oferta não encontrada" });
      if (findOffer.status === StatusOffersEnum.CLOSED) {
        return response
          .status(401)
          .json({ messge: "Esta oferta ja  foi finalizada" });
      }

      if (newProposal.amount > findOffer.amount)
        return response.status(401).json({
          errors: [
            { messge: "A Carga da proposta e maior que a carga oferta" },
          ],
        });

      try {
        const existPropToOffert = await proposalsRepository.findOne({
          user: findUser,
          offer: findOffer,
        });
        if (existPropToOffert)
          return response.status(400).json({
            errors: [{ message: "Você já lançou propostas para essa oferta" }],
          });
      } catch (error) {}

      newProposal.user = findUser;
      newProposal.offer = findOffer;
      const createdProposal = await proposalsRepository.save(newProposal);
      return response.json(createdProposal);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ messge: "Não foi possivel criar a oferta", error });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const proposal: Optional<Proposal> = request.body;
    const jwtPayload = JWTServices.getPayload(request);

    if (!id || isNaN(Number(id)))
      return response
        .status(404)
        .json({ errors: [{ message: "O id da oferta é Invalido" }] });

    if (!jwtPayload)
      return response.status(401).json({
        errors: [{ message: "Não foi possivel validar dados do usuário" }],
      });

    const { user } = jwtPayload;

    const userRepository = getCustomRepository(UserRepository);

    const findedUser = await userRepository.findOne(user.id);
    if (!findedUser)
      return response.status(401).json({
        message: "Não foi possivel validar o usuário, Usuário não encontrado",
      });

    const options: any = {};
    if (user.type === UserType.PROVIDER) {
      options.user = findedUser;
    } else if (proposal.status === StatusProposalsEnum.WAITING) {
      return response
        .status(401)
        .json({ errors: [{ message: "Alteração de status não permitida" }] });
    }

    const proposalRepository = getCustomRepository(ProposalsRepository);
    let findedProposal;
    try {
      findedProposal = await proposalRepository.findOne(Number(id), {
        ...options,
        relations: ["offer"],
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ errors: [{ message: "Erro ao buscar o registro" }] });
    }
    if (!findedProposal)
      return response
        .status(404)
        .json({ errors: [{ message: "Proposta não encontrada" }] });

    if (findedProposal.offer.status === StatusOffersEnum.CLOSED) {
      return response
        .status(401)
        .json({ messge: "Esta oferta ja  foi finalizada" });
    }

    let proposalToBeUpdated;
    try {
      proposalToBeUpdated = await ProposalFactory({
        ...findedProposal,
        ...proposal,
      });
    } catch (error) {
      return response.status(400).json(error);
    }
    if (user.type === UserType.PROVIDER) {
      proposalToBeUpdated.status = findedProposal.status;
    }
    if (proposalToBeUpdated.amount > findedProposal.offer.amount)
      return response.status(401).json({
        errors: [{ message: "A Carga da proposta e maior que a carga oferta" }],
      });

    try {
      const proposalUpdated = await proposalRepository.save(
        proposalToBeUpdated
      );
      response.status(200).json(proposalUpdated);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || isNaN(Number(id)))
      return response
        .status(404)
        .json({ errors: [{ message: "O id da Proposta é Invalido" }] });

    const proposalRepository = getCustomRepository(ProposalsRepository);
    let findedProposal;
    try {
      findedProposal = await proposalRepository.findOne(id, {
        relations: ["user", "offer"],
      });
      if (!findedProposal)
        return response
          .status(404)
          .json({ errors: [{ message: "registro não encontrado" }] });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ errors: [{ message: "Erro ao buscar o registro" }] });
    }
    response.json(findedProposal);
  }

  async find(request: Request, response: Response) {
    const { page, itensPerPage, ...rest } = request.query;

    const take = itensPerPage ? Number(itensPerPage) : 10;
    const skip = page && Number(page) > 1 ? Number(page) * take : 0;
    try {
      const result = await getCustomRepository(
        ProposalsRepository
      ).findAndCount({
        take,
        where: [rest],
        order: { created_at: "DESC" },
        relations: ["user", "offer"],
        skip,
      });
      if (result) {
        const filtred = result[0].map((proposal) => {
          const { name, id } = proposal.user;
          return { ...proposal, user: { name, id } };
        });
        return response.json({ proposals: filtred, count: result[1] });
      }
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ errors: [{ message: "Erro ao carregar os Provedores" }] });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || isNaN(Number(id)))
      return response
        .status(404)
        .json({ errors: [{ message: "O id da Proposta é Invalido" }] });

    const proposalRepository = getCustomRepository(ProposalsRepository);
    let findedProposal;
    try {
      findedProposal = await proposalRepository.findOne(id);
      if (!findedProposal)
        return response
          .status(404)
          .json({ errors: [{ message: "registro não encontrado" }] });
      await proposalRepository.remove(findedProposal);
      return response.json({ errors: [{ message: "Proposta deletada" }] });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ errors: [{ invalid: "Erro ao buscar o registro" }] });
    }
  }
}

export default new ProposalController();
