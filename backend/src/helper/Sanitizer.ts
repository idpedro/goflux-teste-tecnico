export const Sanitizer = {
  removerDocPontuation(doc: string): string | boolean {
    if (!doc) return false;
    const pattern = /[^\d]/gi;
    const response = Number(doc.replace(pattern, ""));
    return !Number.isInteger(response) ? false : String(response);
  },
};
