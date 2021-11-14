import { decode, sign, verify } from "jsonwebtoken";
import { Request } from "express";
import { User } from "./../entity/User";
import { formatDate } from "./Formater";

export type JWTPayload = Pick<User, "id" | "name" | "type">;

export default {
  getToken: (user: JWTPayload) => {
    const token = sign(
      {
        createAt: formatDate(Date.now()),
        user: { id: user.id, name: user.name, type: user.type },
      },
      process.env.JWT_SECRET ?? "SECRETNOTFOUND",
      { expiresIn: process.env.JWT_EXPIRES_TIME ?? "1h" }
    );

    return token;
  },
  checkToken(token: string) {
    return verify(token, process.env.JWT_SECRET ?? "SECRETNOTFOUND");
  },
  getPayload(request: Request) {
    const { authorization } = request.headers;
    if (!authorization) return null;
    const [, token] = authorization?.split(" ");
    return decode(token) as { createAt: Date; user: JWTPayload };
  },
};
