import { Either, right } from "@/application/entities/either";
import { Conference } from "@/application/entities/conference";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { ConferenceRepository } from "../ports/conference-repository";

interface CreateConferenceUseCaseRequest {
  product_note_id: UniqueEntityID;
  internal_code: number;
  quantity_typed?: number;
  checked?: number;
  multiplier?: number;
}

type CreateConferenceUseCaseResponse = Either<null, Conference>;

export class CreateConferenceUseCase {
  constructor(private conferenceRepository: ConferenceRepository) {}

  async execute({
    product_note_id,
    internal_code,
    quantity_typed = 0,
    checked = 0,
    multiplier = 0,
  }: CreateConferenceUseCaseRequest): Promise<CreateConferenceUseCaseResponse> {
    // Colocar verificação se tal produto de tal nota/loja/fornecedor já foi conferido
    const conference = Conference.create({
      product_note_id,
      internal_code,
      quantity_typed,
      checked,
      multiplier,
    });

    await this.conferenceRepository.create(conference);

    return right(conference);
  }
}
