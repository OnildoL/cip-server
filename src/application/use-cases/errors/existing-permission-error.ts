export class ExistingPermissionError extends Error {
  constructor() {
    super("There is a permission registered with this name.");
  }
}
