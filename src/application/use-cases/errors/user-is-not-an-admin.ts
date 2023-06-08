export class UserisNotanAdmin extends Error {
  constructor() {
    super("User is not an admin.");
  }
}
