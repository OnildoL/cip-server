import { Emission } from "@/application/entities/emission";
import { EmissionRepository } from "@/application/use-cases/ports/emission-repository";

export class InMemoryEmissionRepository implements EmissionRepository {
  public items: Emission[] = [];

  async create(emission: Emission) {
    this.items.push(emission);
  }
}
