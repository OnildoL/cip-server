import { Company } from "@/application/entities/company";
import { CompanyRepository } from "@/application/use-cases/ports/company-repository";

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = [];

  async findByCnpj(cnpj: string) {
    const company = this.items.find((item) => item.cnpj === cnpj);

    if (!company) {
      return null;
    }

    return company;
  }

  async create(company: Company) {
    this.items.push(company);
  }
}
