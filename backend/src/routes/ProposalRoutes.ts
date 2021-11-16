import { UserType } from "./../entity/User";
import { Router } from "express";
import ProposalController from "../Controller/ProposalController";
import { isUserType } from "../middleware/isUserType";

const ProposalRoutes = Router();

ProposalRoutes.get("/", ProposalController.index.bind(ProposalController));
ProposalRoutes.get("/find", ProposalController.find.bind(ProposalController));
ProposalRoutes.get("/:id", ProposalController.getById.bind(ProposalController));
ProposalRoutes.post(
  "/",
  isUserType(UserType.PROVIDER),
  ProposalController.create.bind(ProposalController)
);
ProposalRoutes.put("/:id", ProposalController.update.bind(ProposalController));

ProposalRoutes.delete(
  "/:id",
  isUserType(UserType.PROVIDER),
  ProposalController.delete
);

export { ProposalRoutes };
