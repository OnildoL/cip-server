import { User } from "@/application/entities/user";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export interface UserRepository {
  findById(id: UniqueEntityID): Promise<User | null>;
  findByUser(user: number): Promise<User | null>;
  create(user: User): Promise<void>;
}
