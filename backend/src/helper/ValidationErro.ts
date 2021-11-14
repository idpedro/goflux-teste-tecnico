export type TValidateErrors = { [key: string]: string }[];
export class ValidateError extends Error {
  errors: TValidateErrors;
  constructor(message: string, errors: any) {
    super(message);
    this.errors = errors;
  }
}
