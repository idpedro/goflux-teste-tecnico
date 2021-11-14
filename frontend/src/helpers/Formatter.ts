export const Formatter = {
  currency: new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format,
};
