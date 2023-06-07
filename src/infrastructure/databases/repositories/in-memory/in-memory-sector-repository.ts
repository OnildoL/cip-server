import { Sector } from "@/application/entities/sector";
import { SectorRepository } from "@/application/use-cases/ports/sector-repository";

export class InMemorySectorRepository implements SectorRepository {
  public items: Sector[] = [];

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
