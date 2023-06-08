import { CompanySector } from "@/application/entities/company-sector";
import { CompanySectorRepository } from "@/application/use-cases/ports/company-sector-repository";

export class InMemoryCompanySectorRepository
  implements CompanySectorRepository
{
  public items: CompanySector[] = [];

  async create(companySector: CompanySector) {
    this.items.push(companySector);
  }
}
