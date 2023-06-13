import { CompanyProvider } from "@/application/entities/company-provider";
import { CompanyProviderRepository } from "@/application/use-cases/ports/company-provider-repository";

export class InMemoryCompanyProviderRepository
  implements CompanyProviderRepository
{
  public items: CompanyProvider[] = [];

  async create(companyProvider: CompanyProvider): Promise<void> {
    this.items.push(companyProvider);
  }
}
