import { Offer } from "./../entity/Offer";
import { validate } from "class-validator";
import { ValidateError } from "../helper/ValidationErro";

interface offerBody {
  from: string;
  to: string;
  initial_value: number;
  amount: number;
  amount_type: string;
}
export async function OfferFactory({
  to,
  from,
  amount,
  initial_value,
  amount_type,
  ...offer
}: offerBody) {
  const newOffer = new Offer();

  Object.assign(newOffer, {
    to: to.trim(),
    from: from.trim(),
    initial_value: Number(initial_value),
    amount: Number(initial_value),
    amount_type,
  });

  const validationErrors = await validate(newOffer);
  const isInvalid = validationErrors.length > 0;
  if (isInvalid) {
    const erros = validationErrors.map((e) => e.constraints);
    throw new ValidateError("Parâmetros invalidos", erros);
  }

  return newOffer;
}
