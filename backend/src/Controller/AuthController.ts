import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import jwt from "../services/jwt";

class AuthControler {
  async authenticate(req: Request, resp: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(401).json({ message: "Usuário ou Senha Invalido" });
    }

    const userRepository = getCustomRepository(UserRepository);
    const existUser = await userRepository.findOne(
      { email },
      { select: ["email", "password", "type", "name", "id"] }
    );

    if (!existUser)
      return resp.status(401).json({ message: "Usuário ou Senha Invalido" });

    console.log(existUser);
    const isCorrectPass = await compare(password, existUser?.password);

    if (!isCorrectPass)
      return resp.status(401).json({ message: "Usuário ou Senha Inválido" });
    const token = jwt.getToken(existUser);
    return resp.json({
      token,
      user: { id: existUser.id, name: existUser.name, type: existUser.type },
    });
  }

  async check(req: Request, resp: Response) {
    const { authorization } = req.headers;
    if (!authorization)
      return resp.status(401).json({ message: "Sem autorização" });
    const [baere, token] = authorization?.split(" ");
    try {
      const payload = jwt.checkToken(token);
      resp.status(200).json({ message: "Autenticado" });
    } catch (error) {
      return resp.status(401).json({ message: "Sem autorização" });
    }
  }
}
export default new AuthControler();
