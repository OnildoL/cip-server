import { Company } from "@/application/entities/company";
import { Either, left, right } from "@/application/entities/either";
import { ExistingCompanyError } from "@/application/use-cases/errors/existing-company-error";
import { CompanyRepository } from "@/application/use-cases/ports/company-repository";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

interface CreateCompanyUseCaseRequest {
  name: string;
  cnpj: string;
  system_number: number;
  discount?: number | null;
  map?: "SIM" | "NÃO" | null;
  shipping?: "CIF" | "FOB" | null;
  admin_id: UniqueEntityID; // admin_id não deve ser registrado ele serve para verificar se o usuário é admin para criar uma company
}

type CreateCompanyUseCaseResponse = Either<ExistingCompanyError, Company>;

export class CreateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    name,
    cnpj,
    discount = null,
    map = null,
    shipping = null,
    system_number,
    admin_id,
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    // admin_id: new UniqueEntityID(admin_id), // fazer verificação se o usuário é um admin para poder criar uma company
    const companyRegistered = await this.companyRepository.findByCnpj(cnpj);

    if (companyRegistered) {
      return left(new ExistingCompanyError());
    }

    const company = Company.create({
      name,
      cnpj,
      system_number,
      discount,
      map,
      shipping,
    });

    await this.companyRepository.create(company);

    return right(company);
  }
}
