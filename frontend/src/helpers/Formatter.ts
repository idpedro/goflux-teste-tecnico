import { OfferStatusPTBR } from "../context/Offer";
import { ProposalStatusPTBR } from "../context/Proposal";

export const Formatter = {
  currency: new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format,
  data: (data: string) =>
    new Intl.DateTimeFormat("pt-br", {
      day: "numeric",
      month: "long",
      year: "2-digit",
    }).format(new Date(data)),
  offerStatus: (value: any) =>
    OfferStatusPTBR[value.toUpperCase() as keyof typeof OfferStatusPTBR],
  proposalStatus: (value: any) =>
    ProposalStatusPTBR[value.toUpperCase() as keyof typeof ProposalStatusPTBR],
};
