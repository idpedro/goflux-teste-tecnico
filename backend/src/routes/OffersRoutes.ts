import { UserType } from "./../entity/User";
import { Router } from "express";
import OfferController from "../Controller/OfferController";
import { isUserType } from "../middleware/isUserType";

const OfferRouter = Router();

OfferRouter.get("/", OfferController.index.bind(OfferController));
OfferRouter.get("/get/:id", OfferController.getById.bind(OfferController));
OfferRouter.get("/find", OfferController.find.bind(OfferController));
OfferRouter.post(
  "/",
  isUserType(UserType.CUSTOMER),
  OfferController.create.bind(OfferController)
);
OfferRouter.put(
  "/:id",
  isUserType(UserType.CUSTOMER),
  OfferController.update.bind(OfferController)
);

export { OfferRouter };
