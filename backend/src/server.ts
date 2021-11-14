import Cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import "./database";
import { Logger } from "./logger";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { mainRoutes } from "./routes";
import { AuthRouter } from "./routes/Auth";
import { UsersRoutes } from "./routes/UsersRoutes";
dotenv.config();
const App = express();
App.use(Cors());
App.use(express.json());
App.use(Logger.requestListener);
App.use("/api/v1/", isAuthenticated, mainRoutes);
App.use("/user", UsersRoutes);
App.use("/auth", AuthRouter);

const port = Number.isInteger(process.env.PORT)
  ? Number(process.env.PORT)
  : 3333;
const host = process.env.HOST ?? "localhost";

App.listen(port, process.env.HOST as string, () => {
  console.log(`Server Runing on <http://${host}:${port}>`);
});
