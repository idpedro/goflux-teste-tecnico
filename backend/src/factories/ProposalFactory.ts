import { Proposal } from "./../entity/Proposal";
import { validate } from "class-validator";
import { ValidateError } from "../helper/ValidationErro";

export async function ProposalFactory({ amount, value, ...proposal }: any) {
  const newProposal = new Proposal();
  Object.assign(newProposal, {
    ...proposal,
    value: Number(value),
    amount: Number(amount),
  });

  const validationErrors = await validate(newProposal);
  const isInvalid = validationErrors.length > 0;
  if (isInvalid) {
    const erros = validationErrors.map((e) => e.constraints);
    throw new ValidateError("Parâmetros invalidos", erros);
  }

  return newProposal;
}
