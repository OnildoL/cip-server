import { User } from "@/application/entities/user";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { UserRepository } from "@/application/use-cases/ports/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async findById(id: UniqueEntityID) {
    const result = this.items.find(
      (item) => item.id.toValue() === id.toValue()
    );

    if (!result) {
      return null;
    }

    return result;
  }

  async findByUser(user: number) {
    const result = this.items.find((item) => item.user === user);

    if (!result) {
      return null;
    }

    return result;
  }

  async create(user: User) {
    this.items.push(user);
  }
}
