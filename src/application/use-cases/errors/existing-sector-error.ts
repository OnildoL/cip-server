export class ExistingSectorError extends Error {
  constructor() {
    super("There is a sector registered with this name.");
  }
}
