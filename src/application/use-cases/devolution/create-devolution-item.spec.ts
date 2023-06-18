import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryDevolutionItemRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-devolution-item-repository";
import { CreateDevolutionItemUseCase } from "./create-devolution-item";

let inMemoryDevolutionItemRepository: InMemoryDevolutionItemRepository;
let sut: CreateDevolutionItemUseCase;

describe("Create devolution-item", () => {
  beforeEach(() => {
    inMemoryDevolutionItemRepository = new InMemoryDevolutionItemRepository();
    sut = new CreateDevolutionItemUseCase(inMemoryDevolutionItemRepository);
  });

  it("should be able to create a devolution-item", async () => {
    const result = await sut.execute({
      devolution_id: new UniqueEntityID("1"),
      product_id: new UniqueEntityID("1"),
      date: new Date(),
      quantity: 2,
      unitary_in_cent: 39.9,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryDevolutionItemRepository.items[0].devolution_id).toEqual(
        result.value.devolution_id
      );
      expect(inMemoryDevolutionItemRepository.items[0].product_id).toEqual(
        result.value.product_id
      );
      expect(inMemoryDevolutionItemRepository.items[0].unitary_in_cent).toEqual(
        3990
      );
    }
  });
});
