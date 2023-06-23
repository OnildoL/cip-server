import { Either, right } from "@/application/entities/either";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { Hit } from "@/application/entities/hit";
import { HitRepository } from "../ports/hit-repository";

interface CreateHitUseCaseRequest {
  company_id: UniqueEntityID;
  provider_id: UniqueEntityID;
  last_hit?: Date | null;
  current_hit?: Date | null;
  total_sale_in_cent: number;
  total_system_in_cent: number;
  reason?: string | null;
  situation?: "OK" | "ANALISAR" | null;
  date: Date;
  comment?: string | null;
}

type CreateHitUseCaseResponse = Either<null, Hit>;

export class CreateHitUseCase {
  constructor(private hitRepository: HitRepository) {}

  async execute({
    company_id,
    provider_id,
    last_hit = null,
    current_hit = null,
    total_sale_in_cent,
    total_system_in_cent,
    reason = null,
    situation = null,
    date,
    comment = null,
  }: CreateHitUseCaseRequest): Promise<CreateHitUseCaseResponse> {
    const hit = Hit.create({
      company_id,
      provider_id,
      last_hit,
      current_hit,
      total_sale_in_cent,
      total_system_in_cent,
      reason,
      situation,
      date,
      comment,
    });

    await this.hitRepository.create(hit);

    return right(hit);
  }
}
