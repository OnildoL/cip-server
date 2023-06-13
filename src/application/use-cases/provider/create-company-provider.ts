import { Either, right } from "@/application/entities/either";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { CompanyProviderRepository } from "../ports/company-provider-repository";
import { CompanyProvider } from "@/application/entities/company-provider";

interface CreateCompanyProviderUseCaseRequest {
  company_id: UniqueEntityID;
  provider_id: UniqueEntityID;
  discount?: number | null;
  map?: "SIM" | "NÃO" | null;
  shipping?: "CIF" | "FOB" | null;
}

type CreateCompanyProviderUseCaseResponse = Either<null, CompanyProvider>;

export class CreateCompanyProviderUseCase {
  constructor(private companyProviderRepository: CompanyProviderRepository) {}

  async execute({
    company_id,
    provider_id,
    discount = null,
    map = null,
    shipping = null,
  }: CreateCompanyProviderUseCaseRequest): Promise<CreateCompanyProviderUseCaseResponse> {
    const companyProvider = CompanyProvider.create({
      company_id,
      provider_id,
      discount,
      map,
      shipping,
    });

    await this.companyProviderRepository.create(companyProvider);

    return right(companyProvider);
  }
}
