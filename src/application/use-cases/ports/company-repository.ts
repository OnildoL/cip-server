import { Company } from "../../entities/company";

export interface CompanyRepository {
  findByCnpj(cnpj: string): Promise<Company | null>;
  create(company: Company): Promise<void>;
}
