import { GoalRepository } from "../ports/goal-repository";
import { Either, right } from "@/application/entities/either";

interface FetchUniqueYearsUseCaseRequest {
  company_id: string;
}

type FetchUniqueYearsUseCaseResponse = Either<null, number[]>;

export class FetchUniqueYearsUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute({
    company_id,
  }: FetchUniqueYearsUseCaseRequest): Promise<FetchUniqueYearsUseCaseResponse> {
    const years = await this.goalRepository.findManyUniqueYears(company_id);

    return right(years);
  }
}
