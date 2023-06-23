import { HitRepository } from "../ports/hit-repository";
import { Either, left, right } from "@/application/entities/either";
import { HitNotFoundError } from "../errors/hit-not-found-error";

interface DeleteHitUseCaseRequest {
  hit_id: string;
}

type DeleteHitUseCaseResponse = Either<HitNotFoundError, {}>;

export class DeleteHitUseCase {
  constructor(private hitRepository: HitRepository) {}

  async execute({
    hit_id,
  }: DeleteHitUseCaseRequest): Promise<DeleteHitUseCaseResponse> {
    const hit = await this.hitRepository.findById(hit_id);

    if (!hit) {
      return left(new HitNotFoundError());
    }

    await this.hitRepository.delete(hit);

    return right({});
  }
}
