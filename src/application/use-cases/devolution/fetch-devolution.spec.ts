import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { makeCompany } from "@/main/factories/test/make-company";
import { FetchDevolutionsUseCase } from "./fetch-devolutions";
import { InMemoryDevolutionRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-devolution-repository";
import { makeDevolution } from "@/main/factories/test/make-devolution";

let inMemoryDevolutionRepository: InMemoryDevolutionRepository;
let sut: FetchDevolutionsUseCase;

describe("Fetch devolutions", () => {
  beforeEach(() => {
    inMemoryDevolutionRepository = new InMemoryDevolutionRepository();
    sut = new FetchDevolutionsUseCase(inMemoryDevolutionRepository);
  });

  it("should be able to fetch devolutions", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));

    await inMemoryDevolutionRepository.create(
      makeDevolution({
        company_id: company.id,
        date: new Date(2023, 0, 20),
      })
    );
    await inMemoryDevolutionRepository.create(
      makeDevolution({
        company_id: company.id,
        date: new Date(2022, 10, 20),
      })
    );
    await inMemoryDevolutionRepository.create(
      makeDevolution({
        company_id: company.id,
        date: new Date(2022, 11, 20),
      })
    );

    const devolutions = await sut.execute({
      companyId: company.id.toValue(),
      year: 2022,
      page: 1,
    });

    if (devolutions.isRight()) {
      expect(devolutions.value).toHaveLength(2);
      expect(devolutions.value).toEqual([
        expect.objectContaining({
          date: new Date(2022, 11, 20),
        }),
        expect.objectContaining({
          date: new Date(2022, 10, 20),
        }),
      ]);
    }
  });

  it("should be able to fetch paginated devolutions", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));

    for (let i = 1; i <= 22; i++) {
      await inMemoryDevolutionRepository.create(
        makeDevolution({
          company_id: company.id,
          date: new Date(2023, 0, 20),
        })
      );
    }

    const devolutions = await sut.execute({
      companyId: company.id.toValue(),
      year: 2023,
      page: 2,
    });

    if (devolutions.isRight()) {
      expect(devolutions.value).toHaveLength(2);
    }
  });
});
