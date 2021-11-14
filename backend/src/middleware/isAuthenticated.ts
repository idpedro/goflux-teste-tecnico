import { Request, Response, NextFunction } from "express";
import jwt from "../services/jwt";
export function isAuthenticated(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization)
    return resp.status(401).json({ message: "Sem autorização" });
  const [_, token] = authorization?.split(" ");
  try {
    jwt.checkToken(token);
  } catch (error) {
    return resp.status(401).json({ message: "Sem autorização" });
  }
  next();
}
