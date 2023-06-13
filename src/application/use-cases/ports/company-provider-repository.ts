import { CompanyProvider } from "@/application/entities/company-provider";

export interface CompanyProviderRepository {
  create(companyProvider: CompanyProvider): Promise<void>;
}
