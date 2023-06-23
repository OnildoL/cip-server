import { CompanySector } from "@/application/entities/company-sector";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export interface ConsolidatedForTheYearProps {
  company_id: UniqueEntityID;
  sector_id: UniqueEntityID | null;
  company_sector_id: UniqueEntityID;
  name: string | null;
  type: "MAIN" | "SUB";
  amount_in_cent: number;
}
export interface CompanySectorRepository {
  consolidation(
    companyId: string,
    date: number
  ): Promise<ConsolidatedForTheYearProps[]>;
  findMany(companyId: string): Promise<CompanySector[]>;
  create(companySector: CompanySector): Promise<void>;
}
