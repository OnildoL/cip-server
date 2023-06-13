export class ExistingProviderError extends Error {
  constructor() {
    super("There is a provider registered with this cnpj.");
  }
}
