import { CompanySector } from "@/application/entities/company-sector";
import { Either, right } from "@/application/entities/either";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { CompanySectorRepository } from "../ports/company-sector-repository";

interface CreateCompanySectorUseCaseRequest {
  company_id: UniqueEntityID;
  sector_id: UniqueEntityID;
  type: "MAIN" | "SUB";
  main_sector?: UniqueEntityID | null;
}

type CreateCompanySectorUseCaseResponse = Either<null, CompanySector>;

export class CreateCompanySectorUseCase {
  constructor(private companySectorRepository: CompanySectorRepository) {}
  // Talvez colocar uma verificação se tal setor já foi registrada na loja.
  async execute({
    company_id,
    sector_id,
    type,
    main_sector = null,
  }: CreateCompanySectorUseCaseRequest): Promise<CreateCompanySectorUseCaseResponse> {
    const companySector = CompanySector.create({
      company_id,
      sector_id,
      type,
      main_sector,
    });

    await this.companySectorRepository.create(companySector);

    return right(companySector);
  }
}
