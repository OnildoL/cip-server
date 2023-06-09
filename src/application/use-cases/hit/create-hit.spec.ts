import { InMemoryHitRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-hit-repository";
import { CreateHitUseCase } from "./create-hit";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

let inMemoryHitRepository: InMemoryHitRepository;
let sut: CreateHitUseCase;

describe("Create hit", () => {
  beforeEach(() => {
    inMemoryHitRepository = new InMemoryHitRepository();
    sut = new CreateHitUseCase(inMemoryHitRepository);
  });

  it("should be able to create a hit", async () => {
    const result = await sut.execute({
      provider_id: new UniqueEntityID("1"),
      company_id: new UniqueEntityID("1"),
      total_sale_in_cent: 0,
      total_system_in_cent: 0,
      date: new Date(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryHitRepository.items[0].company_id).toEqual(
        result.value.company_id
      );
    }
  });
});
