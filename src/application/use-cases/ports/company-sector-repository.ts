import { CompanySector } from "@/application/entities/company-sector";

export interface CompanySectorRepository {
  create(companySector: CompanySector): Promise<void>;
}
