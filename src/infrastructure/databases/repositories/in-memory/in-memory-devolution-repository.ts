import { Devolution } from "@/application/entities/devolution";
import {
  DevolutionParams,
  DevolutionRepository,
} from "@/application/use-cases/ports/devolution-repository";

export class InMemoryDevolutionRepository implements DevolutionRepository {
  public items: Devolution[] = [];

  async findMany({ companyId, year, page }: DevolutionParams) {
    const devolutions = this.items
      .filter(
        (item) =>
          item.company_id.toValue() === companyId &&
          item.date.getFullYear() === year
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice((page - 1) * 20, page * 20);

    return devolutions;
  }

  async create(devolution: Devolution) {
    this.items.push(devolution);
  }
}
