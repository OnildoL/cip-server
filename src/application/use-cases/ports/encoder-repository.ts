import { Password } from "@/application/entities/value-objects/password";

export interface EncoderRepository {
  encode(password: string): Promise<Password>;
  compare(password: string, hashed: string): Promise<boolean>;
}
