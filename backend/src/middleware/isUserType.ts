import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import JWTService from "../services/jwt";
import { User } from "../entity/User";
import { UserRepository } from "../repositories/UserRepository";

async function getUser(request: Request): Promise<User | undefined> {
  const userRepository = getCustomRepository(UserRepository);

  const payload = JWTService.getPayload(request);

  if (!payload) return;
  const { user: userPayload } = payload;

  const user = await userRepository.findOne({ id: userPayload.id });

  return user;
}

function isUserType(type: string) {
  const roleAutorized = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = await getUser(request);
    if (!user) {
      return response.status(401).json({
        message: "Não foi possivel localizar o usuário",
      });
    }
    if (user.type.toLowerCase() !== type.toLowerCase())
      return response.status(401).json({
        message: "O tipo do usuário não permite essa operação",
      });
    return next();
  };
  return roleAutorized;
}

export { isUserType };
