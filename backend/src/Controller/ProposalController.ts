import { FindManyOptions, getCustomRepository, Like } from "typeorm";
import { Request, Response } from "express";
import JWTServices from "../services/jwt";

import { ProposalFactory } from "../factories/ProposalFactory";
import { Proposal } from "./../entity/Proposal";
import { ProposalsRepository } from "../repositories/ProposalsRepository";

import { UserRepository } from "../repositories/UserRepository";
import { OffersRepository } from "../repositories/OffersRepository";
import { UserType } from "../entity/User";
import { StatusOffersEnum } from "./../entity/Offer";

class ProposalController {
  private getUser(request: Request) {
    const payload = JWTServices.getPayload(request);
    if (!payload) throw new Error("Usuário não autenticado");
    const { user } = payload;
    return user;
  }

  async index(request: Request, response: Response) {
    let user;
    try {
      user = this.getUser(request);
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }

    const findOptions: FindManyOptions<Proposal> = {
      take: 10,
      relations: ["user", "offer"],
    };
    if (user.type === UserType.PROVIDER) {
      findOptions.where = { user: user.id };
    }
    try {
      const proposalRepository = getCustomRepository(ProposalsRepository);
      const proposals = await proposalRepository.findAndCount(findOptions);
      return response.json(proposals);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Não foi possivel  pegar os registros" });
    }
  }

  async create(request: Request, response: Response) {
    let user;
    try {
      user = this.getUser(request);
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }

    const { id_offer, ...proposal } = request.body;

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

      const findOffer = await offersRepository.findOne(id_offer);
      if (!findOffer)
        return response.status(401).json({ messge: "Oferta não encontrada" });
      if (findOffer.status === StatusOffersEnum.CLOSED) {
        return response
          .status(401)
          .json({ messge: "Esta oferta ja  foi finalizada" });
      }

      try {
        const existPropToOffert = await proposalsRepository.findOne({
          user: findUser,
          offer: findOffer,
        });
        if (existPropToOffert)
          response
            .status(400)
            .json({ message: "Você já lançou propostas para essa oferta" });
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
    const jwtPayload = JWTServices.getPayload(request);

    if (!id || isNaN(Number(id)))
      return response
        .status(404)
        .json({ message: "O id da oferta é Invalido" });

    if (!jwtPayload)
      return response
        .status(401)
        .json({ message: "Não foi possivel validar dados do usuário" });

    const { user } = jwtPayload;

    const userRepository = getCustomRepository(UserRepository);

    const findedUser = await userRepository.findOne(user.id);
    if (!findedUser)
      return response.status(401).json({
        message: "Não foi possivel validar o usuário, Usuário não encontrado",
      });

    const proposalRepository = getCustomRepository(ProposalsRepository);
    let findedProposal;
    try {
      findedProposal = await proposalRepository.findOne({
        id: Number(id),
        user: findedUser,
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Erro ao buscar o registro" });
    }
    if (!findedProposal)
      return response.status(404).json({ message: "Proposta não encontrada" });

    const proposal = request.body;
    let proposalToBeUpdated;
    try {
      proposalToBeUpdated = await ProposalFactory({
        ...findedProposal,
        ...proposal,
      });
    } catch (error) {
      return response.status(400).json(error);
    }

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
        .json({ message: "O id da oferta é Invalido" });

    const proposalRepository = getCustomRepository(ProposalsRepository);
    let findedProposal;
    try {
      findedProposal = await proposalRepository.findOne(id);
      if (!findedProposal)
        return response
          .status(404)
          .json({ message: "registro não encontrado" });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Erro ao buscar o registro" });
    }
    response.json(findedProposal);
  }

  async find(request: Request, response: Response) {
    const { ...rest } = request.query;
    try {
      const result = await getCustomRepository(
        ProposalsRepository
      ).findAndCount({
        take: 10,
        where: [rest],
        order: { created_at: "DESC" },
      });
      if (result) {
        return response.json(result);
      }
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Erro ao carregar os Provedores" });
    }
  }
}

export default new ProposalController();
