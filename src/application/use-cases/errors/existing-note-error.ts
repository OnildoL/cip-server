export class ExistingNoteError extends Error {
  constructor() {
    super("There is a note registered with this cnpj.");
  }
}
