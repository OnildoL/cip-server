import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryDevolutionBoxRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-devolution-box-repository";
import { CreateDevolutionBoxUseCase } from "./create-devolution-box";

let inMemoryDevolutionBoxRepository: InMemoryDevolutionBoxRepository;
let sut: CreateDevolutionBoxUseCase;

describe("Create devolution-box", () => {
  beforeEach(() => {
    inMemoryDevolutionBoxRepository = new InMemoryDevolutionBoxRepository();
    sut = new CreateDevolutionBoxUseCase(inMemoryDevolutionBoxRepository);
  });

  it("should be able to create a devolution-box", async () => {
    const result = await sut.execute({
      devolution_item_id: new UniqueEntityID("1"),
      box: 2,
      quantity: 2,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(
        inMemoryDevolutionBoxRepository.items[0].devolution_item_id
      ).toEqual(result.value.devolution_item_id);
    }
  });
});
