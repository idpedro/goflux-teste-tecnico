import { validate } from "class-validator";
import { User } from "../entity/User";
import { Sanitizer } from "../helper/Sanitizer";
import { ValidateError } from "../helper/ValidationErro";

export async function UserFactory(provider: any) {
  const newUser = new User();
  Object.assign(newUser, {
    ...provider,
    doc: Sanitizer.removerDocPontuation(provider.doc),
  });

  const validationErrors = await validate(newUser);
  const isInvalid = validationErrors.length > 0;
  if (isInvalid) {
    const erros = validationErrors.map((e) => e.constraints);
    throw new ValidateError("Parâmetros invalidos", erros);
  }

  return newUser;
}
