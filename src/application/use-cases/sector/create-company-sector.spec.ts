import { InMemoryCompanySectorRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-company-sector-repository";
import { CreateCompanySectorUseCase } from "./company-sector";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

let inMemoryCompanySectorRepository: InMemoryCompanySectorRepository;
let sut: CreateCompanySectorUseCase;

describe("Create company sector", () => {
  beforeEach(() => {
    inMemoryCompanySectorRepository = new InMemoryCompanySectorRepository();
    sut = new CreateCompanySectorUseCase(inMemoryCompanySectorRepository);
  });

  it("should be able to create a company sector", async () => {
    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      sector_id: new UniqueEntityID("1"),
      type: "MAIN",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryCompanySectorRepository.items[0].company_id).toEqual(
        result.value.company_id
      );
      expect(inMemoryCompanySectorRepository.items[0].sector_id).toEqual(
        result.value.sector_id
      );
    }
  });
});
