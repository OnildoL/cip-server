import { Either, right } from "@/application/entities/either";
import { HitRepository } from "../ports/hit-repository";
import { Hit } from "@/application/entities/hit";

interface FetchHitsbyProviderUseCaseRequest {
  provider_id: string;
  page: number;
}

type FetchHitsbyProviderUseCaseResponse = Either<null, { hits: Hit[] }>;

export class FetchHitsbyProviderUseCase {
  constructor(private hitRepository: HitRepository) {}

  async execute({
    provider_id,
    page,
  }: FetchHitsbyProviderUseCaseRequest): Promise<FetchHitsbyProviderUseCaseResponse> {
    const hits = await this.hitRepository.findManyByProvider(provider_id, page);

    return right({ hits });
  }
}
