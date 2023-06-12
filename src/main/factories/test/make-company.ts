import { Company, CompanyProps } from "@/application/entities/company";

export async function makeCompany(override?: Partial<CompanyProps>) {
  const company = Company.create({
    name: "NEW COMPANY EXAMPLE",
    cnpj: "80.557.730/0001-27",
    system_number: 123456,
    ...override,
  });

  return company;
}
