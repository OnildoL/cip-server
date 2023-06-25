import { InMemoryOrderRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-order-repository";
import { EditOrderUseCase } from "./edit-order";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { makeOrder } from "@/main/factories/test/make-order";
import { OrderNotFoundError } from "../errors/order-not-found-error";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: EditOrderUseCase;

describe("Edit order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new EditOrderUseCase(inMemoryOrderRepository);
  });

  it("should be able to edit a order", async () => {
    const newOrder = makeOrder({}, new UniqueEntityID("order-1"));

    await inMemoryOrderRepository.create(newOrder);

    const editOrderTeste = {
      order_id: "order-1",
      goal_id: new UniqueEntityID("new-goal-2"),
      name: "EXEMPLO DE PEDIDO",
      amount_in_cent: 2345.89,
      date: new Date(),
      comment: "EXEMPLO DE COMENTARIO",
    };

    await sut.execute(editOrderTeste);

    expect(inMemoryOrderRepository.items[0].amount_in_cent).toEqual(234589);
    expect(inMemoryOrderRepository.items[0].goal_id).toEqual(
      expect.objectContaining({ value: "new-goal-2" })
    );
  });
});
