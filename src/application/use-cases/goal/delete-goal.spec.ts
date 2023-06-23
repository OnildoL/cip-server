import { InMemoryGoalRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-goal-repository";
import { DeleteGoalUseCase } from "./delete-goal";
import { makeGoal } from "@/main/factories/test/make-goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

let inMemoryGoalRepository: InMemoryGoalRepository;
let sut: DeleteGoalUseCase;

describe("Delete goal", () => {
  beforeEach(() => {
    inMemoryGoalRepository = new InMemoryGoalRepository();
    sut = new DeleteGoalUseCase(inMemoryGoalRepository);
  });

  it("should be able to delete a goal", async () => {
    const newGoal = makeGoal({}, new UniqueEntityID("goal-1"));

    await inMemoryGoalRepository.create(newGoal);

    await sut.execute({
      goal_id: newGoal.id.toValue(),
    });

    expect(inMemoryGoalRepository.items).toHaveLength(0);
  });
});
