export class ExistingCompanyError extends Error {
  constructor() {
    super("There is a company registered with this cnpj.");
  }
}
