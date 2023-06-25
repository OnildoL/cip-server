import { InMemoryOrderRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-order-repository";
import { DeleteOrderUseCase } from "./delete-order";
import { makeOrder } from "@/main/factories/test/make-order";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: DeleteOrderUseCase;

describe("Delete order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new DeleteOrderUseCase(inMemoryOrderRepository);
  });

  it("should be able to delete a order", async () => {
    const newOrder = makeOrder({}, new UniqueEntityID("order-1"));

    await inMemoryOrderRepository.create(newOrder);

    await sut.execute({
      order_id: newOrder.id.toValue(),
    });

    expect(inMemoryOrderRepository.items).toHaveLength(0);
  });
});
