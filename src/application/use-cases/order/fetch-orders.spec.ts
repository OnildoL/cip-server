import { InMemoryOrderRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-order-repository";
import { makeOrder } from "@/main/factories/test/make-order";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { makeCompany } from "@/main/factories/test/make-company";
import { FetchOrdersUseCase } from "./fetch-orders";
import { makeGoal } from "@/main/factories/test/make-goal";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: FetchOrdersUseCase;

describe("Fetch orders", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new FetchOrdersUseCase(inMemoryOrderRepository);
  });

  it("should be able to fetch orders", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));
    const goal = makeGoal({}, new UniqueEntityID("new-goal-1"));

    await inMemoryOrderRepository.create(
      makeOrder({
        company_id: company.id,
        goal_id: goal.id,
        date: new Date(2023, 0, 20),
      })
    );
    await inMemoryOrderRepository.create(
      makeOrder({
        company_id: company.id,
        goal_id: goal.id,
        date: new Date(2022, 10, 20),
      })
    );
    await inMemoryOrderRepository.create(
      makeOrder({
        company_id: company.id,
        goal_id: goal.id,
        date: new Date(2022, 11, 20),
      })
    );

    const orders = await sut.execute({
      goalId: goal.id.toValue(),
      year: 2022,
      page: 1,
    });

    if (orders.isRight()) {
      expect(orders.value).toHaveLength(2);
      expect(orders.value).toEqual([
        expect.objectContaining({
          goal_id: goal.id,
          date: new Date(2022, 11, 20),
        }),
        expect.objectContaining({
          goal_id: goal.id,
          date: new Date(2022, 10, 20),
        }),
      ]);
    }
  });

  it("should be able to fetch paginated orders", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));
    const goal = makeGoal({}, new UniqueEntityID("new-goal-1"));

    for (let i = 1; i <= 22; i++) {
      await inMemoryOrderRepository.create(
        makeOrder({
          company_id: company.id,
          goal_id: goal.id,
          date: new Date(2022, 11, 20),
        })
      );
    }

    const orders = await sut.execute({
      goalId: goal.id.toValue(),
      year: 2022,
      page: 2,
    });

    if (orders.isRight()) {
      expect(orders.value).toHaveLength(2);
    }
  });
});
