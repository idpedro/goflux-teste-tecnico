import { Router } from "express";
import { ProposalRoutes } from "./ProposalRoutes";
import { OfferRouter } from "./OffersRoutes";

const mainRoutes = Router();
mainRoutes.use("/proposal", ProposalRoutes);
mainRoutes.use("/offer", OfferRouter);

mainRoutes.all("/", (req, resp) => {
  process.stdout.write(`Server Runing on`);

  resp.json({ message: "its Work" });
});

export { mainRoutes };
