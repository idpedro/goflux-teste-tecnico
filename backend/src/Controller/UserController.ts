import { getCustomRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { UserFactory } from "../factories/UserFactory";
import { ProposalsRepository } from "../repositories/ProposalsRepository";
import JWTService, { JWTPayload } from "../services/jwt";
import { UserType } from "../entity/User";
import { OffersRepository } from "../repositories/OffersRepository";
class UserController {
  private user: JWTPayload;
  constructor() {}

  async index(request: Request, response: Response) {
    try {
      const result = await getCustomRepository(UserRepository).find({
        take: 10,
      });
      if (result) {
        return response.json(result);
      }
    } catch (error) {
      return response
        .status(500)
        .json({ errors: [{ message: "Erro ao carregar os Usuárioes" }] });
    }
  }

  async create(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const user = request.body;

    let newUser;
    try {
      newUser = await UserFactory(user);
    } catch (error) {
      return response.status(400).json(error);
    }

    const repository = getCustomRepository(UserRepository);
    const cantFind = await repository.findOne({
      where: [{ name: newUser.email }, { doc: newUser.doc }],
    });

    if (cantFind)
      return response
        .status(400)
        .json({ errors: [{ message: "O Usuário já existe" }] });

    try {
      newUser.password = await hash(newUser.password, 8);
      await repository.save(newUser);
    } catch (error: any) {
      if (error.name === "QueryFailedError")
        return response.status(400).json({
          message:
            "Erro ao salvar o usuário, verifique os campos e tente novamente",
          detail: error.message,
        });
      response
        .status(500)
        .json({ errors: [{ message: "Erro Interno ao salvar registro" }] });
    }
    return response.status(201).json(newUser);
  }

  private validUser(request: Request, response: Response) {
    const tokenPayload = JWTService.getPayload(request);
    if (!tokenPayload) return response.status(400).json("Sem autorização");

    const { user: jwtUser } = tokenPayload;
    this.user = jwtUser;
  }

  async update(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    this.validUser(request, response);

    const repository = getCustomRepository(UserRepository);
    const findUser = await repository
      .createQueryBuilder()
      .where("id = :id", { id: this.user.id })
      .addSelect("User.password")
      .addSelect("User.doc")
      .getOne();
    console.log(findUser);

    if (!findUser)
      return response
        .status(400)
        .json({ errors: [{ message: "O Usuário não encontrado" }] });

    const newUserData = request.body;
    let userToBeUpdated;
    try {
      userToBeUpdated = await UserFactory({
        ...findUser,
        ...newUserData,
      });
    } catch (error) {
      return response.status(400).json(error);
    }

    try {
      if (
        newUserData.password &&
        !(await compare(userToBeUpdated.password, findUser.password))
      ) {
        userToBeUpdated.password = await hash(userToBeUpdated.password, 8);
      } else userToBeUpdated.password = findUser.password;
      const { affected } = await repository.update(
        this.user.id,
        userToBeUpdated
      );

      if (affected)
        return response.json({
          message: "Usuário Atualizado",
          user: userToBeUpdated,
        });
    } catch (error: any) {
      if (error.name === "UpdateValuesMissingError")
        return response.status(400).json({
          message:
            "Erro ao atualizar o usuário, verifique os campos e tente novamente",
          detail: error.message,
        });
      return response.status(500).json({
        message: "Erro Interno ao atualizar registro",
        erro: error.message,
      });
    }
    return response.status(201).json(userToBeUpdated);
  }

  async find(request: Request, response: Response) {
    const params = request.query;
    try {
      const result = await getCustomRepository(UserRepository).findAndCount({
        take: 10,
        where: [
          params,
          { name: Like(`%${params.name}%`) },
          { doc: Like(`%${params.doc}%`) },
        ],
        order: { name: "ASC" },
      });
      if (result) {
        return response.json(result);
      }
    } catch (error) {
      return response
        .status(500)
        .json({ errors: [{ message: "Erro ao carregar os Usuárioes" }] });
    }
  }

  async getById(request: Request, response: Response) {
    this.validUser(request, response);

    try {
      const repository = getCustomRepository(UserRepository);
      const findUser = await repository.findOne(this.user.id);

      if (!findUser)
        return response
          .status(404)
          .json({ errors: [{ message: "O Usuário não encontrado" }] });

      response.json(findUser);
    } catch (error) {
      return response
        .status(500)
        .json({ errors: [{ message: "Não foi possivel buscar o usuário" }] });
    }
  }

  async getByType(request: Request, response: Response) {
    const { type } = request.params;
    try {
      const repository = getCustomRepository(UserRepository);
      const findUsers = await repository.findAndCount({ where: { type } });

      if (!findUsers.length)
        return response
          .status(404)
          .json({ errors: [{ message: "Registros não encontrados" }] });

      response.json(findUsers);
    } catch (error) {
      return response
        .status(500)
        .json({ errors: [{ message: "Não foi possivel buscar o registros" }] });
    }
  }

  async delete(request: Request, response: Response) {
    this.validUser(request, response);
    const repository = getCustomRepository(UserRepository);
    const findUser = await repository.findOne(this.user.id);

    if (!findUser)
      return response.status(404).json({
        errors: [{ message: "O Usuario não encontrado para a remoção" }],
      });

    const isProvider = findUser.type === UserType.PROVIDER;
    const associatedRepository = getCustomRepository(
      isProvider ? ProposalsRepository : OffersRepository
    );
    try {
      const [_, associatedCount] = await associatedRepository.findAndCount({
        where: { user: findUser },
      });
      if (associatedCount > 0) {
        return response.status(400).json({
          message: `O Usuario ainda tem ${
            isProvider ? "propostas" : "ofertas"
          } em aberto`,
        });
      }

      await repository.remove(findUser);

      response
        .status(200)
        .json({ errors: [{ message: `Usuario Removido com sucesso` }] });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ erros: [{ server_error: "Erro ao deleta o úsuario" }] });
    }
  }
}

export default new UserController();
