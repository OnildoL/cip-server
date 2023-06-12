import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryOrderRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-order-repository";
import { CreateOrderUseCase } from "./create-order";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe("Create order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new CreateOrderUseCase(inMemoryOrderRepository);
  });

  it("should be able to create a goal", async () => {
    const result = await sut.execute({
      goal_id: new UniqueEntityID("1"),
      company_id: new UniqueEntityID("1"),
      name: "FAKE ORDER",
      amount_in_cent: 2542.56,
      date: new Date(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryOrderRepository.items[0].company_id).toEqual(
        result.value.company_id
      );
      expect(inMemoryOrderRepository.items[0].goal_id).toEqual(
        result.value.goal_id
      );
      expect(inMemoryOrderRepository.items[0].amount_in_cent).toEqual(254256);
    }
  });
});
