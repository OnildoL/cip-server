import { CompanyUser } from "@/application/entities/company-user";
import { CompanyUserRepository } from "@/application/use-cases/ports/company-user-repository";

export class InMemoryCompanyUserRepository implements CompanyUserRepository {
  public items: CompanyUser[] = [];

  async create(companyUser: CompanyUser): Promise<void> {
    this.items.push(companyUser);
  }
}
