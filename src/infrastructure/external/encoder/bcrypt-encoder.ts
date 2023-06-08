import { Password } from "@/application/entities/value-objects/password";
import { EncoderRepository } from "@/application/use-cases/ports/encoder-repository";
import bcrypt from "bcryptjs";

export class BcryptEncoder implements EncoderRepository {
  private readonly rounds: number = 6;

  constructor(rounds: number) {
    this.rounds = rounds;
  }

  async encode(password: string) {
    return new Password(await bcrypt.hash(password, this.rounds));
  }

  async compare(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  }
}
