import { Router } from "express";
import AuthController from "../Controller/AuthController";

const AuthRouter = Router();

AuthRouter.get("/", AuthController.check);
AuthRouter.post("/", AuthController.authenticate);

export { AuthRouter };
