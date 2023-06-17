export class ExistingProductError extends Error {
  constructor() {
    super("There is a product registered with this cnpj.");
  }
}
