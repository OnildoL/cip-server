import { Hit } from "@/application/entities/hit";
import { HitRepository } from "@/application/use-cases/ports/hit-repository";

export class InMemoryHitRepository implements HitRepository {
  public items: Hit[] = [];

  async create(hit: Hit) {
    this.items.push(hit);
  }
}
