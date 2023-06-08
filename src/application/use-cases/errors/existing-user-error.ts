export class ExistingUserError extends Error {
  constructor() {
    super("There is a user registered with this number.");
  }
}
