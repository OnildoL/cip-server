import { Either, left, right } from "../either";
import { InvalidPasswordError } from "../errors/invalid-password-error";

export class Password {
  private _value: string;

  constructor(value?: string) {
    this._value = value ?? "";
  }

  get value() {
    return this._value;
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (valid(password)) {
      return right(new Password(password));
    }

    return left(new InvalidPasswordError());
  }
}

function valid(password: string): boolean {
  if (!password) {
    return false;
  }

  if (noLetterIn(password) || tooShort(password)) {
    return false;
  }

  return true;
}

function noLetterIn(password: string) {
  return /[a-zA-Z]/.test(password);
}

function tooShort(password: string) {
  return password.length < 6;
}
