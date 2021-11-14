import { Offer } from "./../entity/Offer";
import { FindManyOptions, getCustomRepository, Like } from "typeorm";
import { Request, Response } from "express";

import JWTServices from "../services/jwt";

import { OffersRepository } from "../repositories/OffersRepository";
import { OfferFactory } from "../factories/OfferFactory";
import { UserRepository } from "../repositories/UserRepository";
import { UserType } from "../entity/User";

class OfferController {
  private getUser(request: Request) {
    const payload = JWTServices.getPayload(request);
    if (!payload) throw new Error("Usuário não autenticado");
    const { user } = payload;
    return user;
  }

  async index(request: Request, response: Response) {
    let { page, itemsPerPage } = request.query;
    let user;
    try {
      user = this.getUser(request);
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }

    const take = itemsPerPage ? Number(itemsPerPage) : 10;
    const skip = page && Number(page) > 1 ? Number(page) * take : 0;
    const findOptions: FindManyOptions<Offer> = {
      take,
      skip,
      relations: ["proposals"],
      where: { status: "active" },
      order: { id: "ASC" },
    };

    if (user.type === UserType.CUSTOMER) {
      findOptions.where = { status: "active", user: user.id };
    }

    try {
      const offerRepository = getCustomRepository(OffersRepository);
      const [offers, count] = await offerRepository.findAndCount(findOptions);
      const offersMapped = offers.map((offer) => {
        return {
          ...offer,
          proposals: offer.proposals.reduce((count) => count + 1, 0),
        };
      });
      return response.json({ count, offers: offersMapped });
    } catch (error) {
      console.log(error);
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

    const offer = request.body;

    let newOffer;
    try {
      newOffer = await OfferFactory(offer);
    } catch (error) {
      return response.status(400).json(error);
    }

    const offersRepository = getCustomRepository(OffersRepository);
    const userRepository = getCustomRepository(UserRepository);

    try {
      const findUser = await userRepository.findOne(
        { id: user.id },
        { select: ["id", "name"] }
      );
      if (!findUser)
        return response.status(401).json({ messge: "Usuário não encontrado" });
      newOffer.user = findUser;
      const createdOffer = await offersRepository.save(newOffer);
      return response.json(createdOffer);
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json({ messge: "Não foi possivel criar a oferta" });
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

    const offerRepository = getCustomRepository(OffersRepository);
    let findedOffer;
    try {
      findedOffer = await offerRepository.findOne({
        id: Number(id),
        user: findedUser,
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Erro ao buscar o registro" });
    }
    if (!findedOffer)
      return response.status(404).json({ message: "Oferta não encontrada" });

    const offer = request.body;
    let offerToBeUpdated;
    try {
      offerToBeUpdated = await OfferFactory({ ...findedOffer, ...offer });
    } catch (error) {
      return response.status(400).json(error);
    }

    try {
      const offerUpdated = await offerRepository.save(offerToBeUpdated);
      response.status(200).json(offerUpdated);
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

    const offerRepository = getCustomRepository(OffersRepository);
    let findedOffer;
    try {
      findedOffer = await offerRepository.findOne(id, {
        relations: ["proposals", "proposals.user"],
      });
      if (!findedOffer)
        return response
          .status(404)
          .json({ message: "registro não encontrado" });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Erro ao buscar o registro" });
    }
    response.json(findedOffer);
  }
  async find(request: Request, response: Response) {
    const params = request.query;
    try {
      const result = await getCustomRepository(OffersRepository).findAndCount({
        take: 10,
        where: [
          params,
          { to: Like(`%${params.to}%`) },
          { from: Like(`%${params.from}%`) },
        ],
      });
      if (result) {
        return response.json(result);
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro ao carregar as Ofertas" });
    }
  }
}

export default new OfferController();
