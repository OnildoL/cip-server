import { Company } from "@/application/entities/company";
import { Either, left, right } from "@/application/entities/either";
import { ExistingCompanyError } from "@/application/use-cases/errors/existing-company-error";
import { CompanyRepository } from "@/application/use-cases/ports/company-repository";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

interface CreateCompanyUseCaseRequest {
  name: string;
  cnpj: string;
  system_number: number;
  admin_id: string;
}

type CreateCompanyUseCaseResponse = Either<ExistingCompanyError, Company>;

export class CreateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    name,
    cnpj,
    system_number,
    admin_id,
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    const companyRegistered = await this.companyRepository.findByCnpj(cnpj);

    if (companyRegistered) {
      return left(new ExistingCompanyError());
    }

    const company = Company.create({
      name,
      cnpj,
      system_number,
      admin_id: new UniqueEntityID(admin_id),
    });

    await this.companyRepository.create(company);

    return right(company);
  }
}
