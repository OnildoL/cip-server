import { Either, right } from "@/application/entities/either";
import { DevolutionRepository } from "../ports/devolution-repository";
import { Devolution } from "@/application/entities/devolution";

interface FetchDevolutionsUseCaseRequest {
  companyId: string;
  year: number;
  page: number;
}

type FetchDevolutionsUseCaseResponse = Either<null, Devolution[]>;

export class FetchDevolutionsUseCase {
  constructor(private devolutionsRepository: DevolutionRepository) {}
  async execute({
    companyId,
    year,
    page,
  }: FetchDevolutionsUseCaseRequest): Promise<FetchDevolutionsUseCaseResponse> {
    const devolutions = await this.devolutionsRepository.findMany({
      companyId,
      year,
      page,
    });

    return right(devolutions);
  }
}
