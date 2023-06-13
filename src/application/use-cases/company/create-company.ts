import { Company } from "@/application/entities/company";
import { Either, left, right } from "@/application/entities/either";
import { ExistingCompanyError } from "@/application/use-cases/errors/existing-company-error";
import { CompanyRepository } from "@/application/use-cases/ports/company-repository";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { UserRepository } from "../ports/user-repository";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";

interface CreateCompanyUseCaseRequest {
  name: string;
  cnpj: string;
  system_number: number; // Talvez uma verificação se existe um mesmo número no sistema ja registrado.
  admin_id: UniqueEntityID;
}

type CreateCompanyUseCaseResponse = Either<
  UserisNotanAdmin | ExistingCompanyError,
  Company
>;

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    name,
    cnpj,
    system_number,
    admin_id,
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    const user = await this.userRepository.findById(admin_id);

    if (!user?.admin) {
      return left(new UserisNotanAdmin());
    }

    const companyRegistered = await this.companyRepository.findByCnpj(cnpj);

    if (companyRegistered) {
      return left(new ExistingCompanyError());
    }

    const company = Company.create({
      name,
      cnpj,
      system_number,
    });

    await this.companyRepository.create(company);

    return right(company);
  }
}
