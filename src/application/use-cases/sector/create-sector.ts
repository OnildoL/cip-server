import { Sector } from "@/application/entities/sector";
import { ExistingSectorError } from "../errors/existing-sector-error";
import { Either, left, right } from "@/application/entities/either";
import { SectorRepository } from "../ports/sector-repository";

interface CreateSectorUseCaseRequest {
  name: string;
}

type CreateSectorUseCaseResponse = Either<ExistingSectorError, Sector>;

export class CreateSectorUseCase {
  constructor(private sectorRepository: SectorRepository) {}

  async execute({
    name,
  }: CreateSectorUseCaseRequest): Promise<CreateSectorUseCaseResponse> {
    const sectorRegistered = await this.sectorRepository.findByName(name);

    if (sectorRegistered) {
      return left(new ExistingSectorError());
    }

    const sector = Sector.create({ name });

    await this.sectorRepository.create(sector);

    return right(sector);
  }
}
