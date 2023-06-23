import { Either, right } from "@/application/entities/either";
import {
  CompanySectorRepository,
  ConsolidatedForTheYearProps,
} from "../ports/company-sector-repository";

interface GetConsolidatedForTheYearUseCaseRequest {
  company_id: string;
  date: number;
}

type GetConsolidatedForTheYearUseCaseResponse = Either<
  null,
  { consolidation: ConsolidatedForTheYearProps[] }
>;

export class GetConsolidatedForTheYearUseCase {
  constructor(private companySectorRepository: CompanySectorRepository) {}

  async execute({
    company_id,
    date,
  }: GetConsolidatedForTheYearUseCaseRequest): Promise<GetConsolidatedForTheYearUseCaseResponse> {
    const consolidation = await this.companySectorRepository.consolidation(
      company_id,
      date
    );

    return right({ consolidation });
  }
}
