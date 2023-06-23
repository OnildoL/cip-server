import { Sector } from "@/application/entities/sector";
import { SectorRepository } from "@/application/use-cases/ports/sector-repository";

export class InMemorySectorRepository implements SectorRepository {
  public items: Sector[] = [];

  async findById(id: string) {
    const result = this.items.find((item) => item.id.toValue() === id);

    if (!result) {
      return null;
    }

    return result;
  }

  async findByName(name: string) {
    const sector = this.items.find((item) => item.name === name);

    if (!sector) {
      return null;
    }

    return sector;
  }

  async create(sector: Sector) {
    this.items.push(sector);
  }
}
