import { CompanyUser } from "@/application/entities/company-user";

export interface CompanyUserRepository {
  create(companyUser: CompanyUser): Promise<void>;
}
