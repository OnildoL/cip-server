import { InMemoryHitRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-hit-repository";
import { makeHit } from "@/main/factories/test/make-hit";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { makeCompany } from "@/main/factories/test/make-company";
import { FetchHitsbyProviderUseCase } from "./fetch-hits-by-provider";
import { makeProvider } from "@/main/factories/test/make-provider";

let inMemoryHitRepository: InMemoryHitRepository;
let sut: FetchHitsbyProviderUseCase;

describe("Fetch hits", () => {
  beforeEach(() => {
    inMemoryHitRepository = new InMemoryHitRepository();
    sut = new FetchHitsbyProviderUseCase(inMemoryHitRepository);
  });

  it("should be able to fetch hits by provider", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));
    const provider = makeProvider({}, new UniqueEntityID("new-provider-1"));

    await inMemoryHitRepository.create(
      makeHit({
        provider_id: provider.id,
        company_id: company.id,
        date: new Date(2023, 0, 20),
      })
    );
    await inMemoryHitRepository.create(
      makeHit({
        provider_id: provider.id,
        company_id: company.id,
        date: new Date(2022, 10, 20),
      })
    );
    await inMemoryHitRepository.create(
      makeHit({
        provider_id: provider.id,
        company_id: company.id,
        date: new Date(2022, 11, 20),
      })
    );

    const hits = await sut.execute({
      provider_id: provider.id.toValue(),
      page: 1,
    });

    if (hits.isRight()) {
      expect(hits.value.hits).toEqual([
        expect.objectContaining({
          date: new Date(2023, 0, 20),
        }),
        expect.objectContaining({
          date: new Date(2022, 11, 20),
        }),
        expect.objectContaining({
          date: new Date(2022, 10, 20),
        }),
      ]);
    }
  });

  it("should be able to fetch paginated hits by provider", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));
    const provider = makeProvider({}, new UniqueEntityID("new-provider-1"));

    for (let i = 1; i <= 22; i++) {
      await inMemoryHitRepository.create(
        makeHit({
          provider_id: provider.id,
          company_id: company.id,
          date: new Date(2023, 0, 20),
        })
      );
    }

    const hits = await sut.execute({
      provider_id: provider.id.toValue(),
      page: 2,
    });

    if (hits.isRight()) {
      expect(hits.value.hits).toHaveLength(2);
    }
  });
});
