import { Either, right } from "@/application/entities/either";
import { Emission } from "@/application/entities/emission";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { EmissionRepository } from "../ports/emission-repository";

interface CreateEmissionUseCaseRequest {
  bond_id: UniqueEntityID;
  /**
   * Acrescentar uma propriedade:
   *    symbolic: number;
   */
  nf: number;
  comment?: string | null;
}

type CreateEmissionUseCaseResponse = Either<null, Emission>;

export class CreateEmissionUseCase {
  constructor(private emissionRepository: EmissionRepository) {}

  async execute({
    bond_id,
    nf,
    comment = null,
  }: CreateEmissionUseCaseRequest): Promise<CreateEmissionUseCaseResponse> {
    const emission = Emission.create({
      bond_id,
      nf,
      comment,
    });

    await this.emissionRepository.create(emission);

    return right(emission);
  }
}
