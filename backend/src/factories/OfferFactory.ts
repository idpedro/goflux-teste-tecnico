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
export async function OfferFactory(offer: offerBody) {
  console.log("fiter", offer);
  const newOffer = new Offer();
  const { to, from, amount, initial_value, amount_type } = offer;
  Object.assign(newOffer, {
    ...offer,
    to: to.trim(),
    from: from.trim(),
    initial_value: Number(initial_value),
    amount: Number(amount),
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
