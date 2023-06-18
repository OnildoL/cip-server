import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryEmissionRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-emission-repository";
import { CreateEmissionUseCase } from "./create-emission";

let inMemoryEmissionRepository: InMemoryEmissionRepository;
let sut: CreateEmissionUseCase;

describe("Create emission", () => {
  beforeEach(() => {
    inMemoryEmissionRepository = new InMemoryEmissionRepository();
    sut = new CreateEmissionUseCase(inMemoryEmissionRepository);
  });

  it("should be able to create a emission", async () => {
    const result = await sut.execute({
      bond_id: new UniqueEntityID("1"),
      nf: 123456,
      comment: "EXEMPLO DE COMENTÁRIO",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryEmissionRepository.items[0].bond_id).toEqual(
        result.value.bond_id
      );
      expect(inMemoryEmissionRepository.items[0].nf).toEqual(123456);
    }
  });
});
