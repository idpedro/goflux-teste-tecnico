import { Router } from "express";
import UserController from "../Controller/UserController";
import { isAuthenticated } from "../middleware/isAuthenticated";

const UsersRoutes = Router();

UsersRoutes.get("/", isAuthenticated, UserController.index).bind(
  UserController
);
UsersRoutes.get("/find", UserController.find.bind(UserController));
UsersRoutes.get("/get/:id", UserController.getById);
UsersRoutes.get("/type:", UserController.getByType.bind(UserController));

UsersRoutes.post("/", UserController.create.bind(UserController));
UsersRoutes.put(
  "/",
  isAuthenticated,
  UserController.update.bind(UserController)
);

UsersRoutes.delete(
  "/",
  isAuthenticated,
  UserController.delete.bind(UserController)
);

export { UsersRoutes };
