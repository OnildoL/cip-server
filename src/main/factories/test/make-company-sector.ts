import {
  CompanySector,
  CompanySectorProps,
} from "@/application/entities/company-sector";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export async function makeCompanySector(
  override?: Partial<CompanySectorProps>,
  id?: UniqueEntityID
) {
  const companySector = CompanySector.create(
    {
      company_id: new UniqueEntityID("1"),
      sector_id: new UniqueEntityID("1"),
      type: "MAIN",
      ...override,
    },
    id
  );

  return companySector;
}
