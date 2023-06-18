import { Devolution } from "@/application/entities/devolution";
import { DevolutionRepository } from "@/application/use-cases/ports/devolution-repository";

export class InMemoryDevolutionRepository implements DevolutionRepository {
  public items: Devolution[] = [];

  async create(devolution: Devolution) {
    this.items.push(devolution);
  }
}
