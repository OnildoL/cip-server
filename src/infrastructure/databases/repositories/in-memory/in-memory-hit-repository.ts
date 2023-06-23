import { Hit } from "@/application/entities/hit";
import { HitRepository } from "@/application/use-cases/ports/hit-repository";

export class InMemoryHitRepository implements HitRepository {
  public items: Hit[] = [];

  async findById(id: string) {
    const result = this.items.find((item) => item.id.toValue() === id);

    if (!result) {
      return null;
    }

    return result;
  }

  async create(hit: Hit) {
    this.items.push(hit);
  }

  async save(hit: Hit) {
    const itemIndex = this.items.findIndex((item) => item.id === hit.id);

    this.items[itemIndex] = hit;
  }
}
