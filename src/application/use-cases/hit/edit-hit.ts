import { HitRepository } from "../ports/hit-repository";
import { HitNotFoundError } from "../errors/hit-not-found-error";
import { Either, left, right } from "@/application/entities/either";
import { Hit } from "@/application/entities/hit";

interface EditHitUseCaseRequest {
  hit_id: string;
  last_hit?: Date;
  current_hit?: Date;
  total_sale_in_cent?: number;
  total_system_in_cent?: number;
  reason?: string;
  situation?: string;
  comment?: string;
}

type EditHitUseCaseResponse = Either<HitNotFoundError, { hit: Hit }>;

export class EditHitUseCase {
  constructor(private hitRepository: HitRepository) {}

  async execute({
    hit_id,
    last_hit,
    current_hit,
    total_sale_in_cent = 0,
    total_system_in_cent = 0,
    reason,
    situation,
    comment,
  }: EditHitUseCaseRequest): Promise<EditHitUseCaseResponse> {
    const hit = await this.hitRepository.findById(hit_id);

    if (!hit) {
      return left(new HitNotFoundError());
    }

    hit.last_hit = last_hit;
    hit.current_hit = current_hit;
    hit.total_sale_in_cent = total_sale_in_cent;
    hit.total_system_in_cent = total_system_in_cent;
    hit.reason = reason;
    hit.situation = situation;
    hit.comment = comment;

    await this.hitRepository.save(hit);

    return right({ hit });
  }
}
