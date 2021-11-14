export const formatDate = new Intl.DateTimeFormat("PT-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format;
