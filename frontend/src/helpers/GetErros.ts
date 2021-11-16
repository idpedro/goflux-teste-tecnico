import { toast } from "react-toastify";
export const showErrors = (errors: any) => {
  if (errors) {
    (errors as { [key: string]: string }[]).forEach((errorObj) => {
      for (let key in errorObj) {
        toast.warning(errorObj[key]);
      }
    });
  } else {
    toast.error("A operação falhou");
  }
};
