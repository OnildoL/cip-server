import { Company, CompanyProps } from "@/application/entities/company";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export async function makeCompany(
  override?: Partial<CompanyProps>,
  id?: UniqueEntityID
) {
  const company = Company.create(
    {
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
      ...override,
    },
    id
  );

  return company;
}
