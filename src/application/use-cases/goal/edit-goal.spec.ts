import { InMemoryGoalRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-goal-repository";
import { EditGoalUseCase } from "./edit-goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { makeGoal } from "@/main/factories/test/make-goal";
import { GoalNotFoundError } from "../errors/goal-not-found-error";

let inMemoryGoalRepository: InMemoryGoalRepository;
let sut: EditGoalUseCase;

describe("Edit goal", () => {
  beforeEach(() => {
    inMemoryGoalRepository = new InMemoryGoalRepository();
    sut = new EditGoalUseCase(inMemoryGoalRepository);
  });

  it("should be able to Edit a goal", async () => {
    const newGoal = await makeGoal({}, new UniqueEntityID("goal-1"));

    await inMemoryGoalRepository.create(newGoal);

    const editGoalTeste = {
      goal_id: "goal-1",
      amount_in_cent: 1241.11,
      date: new Date(),
    };

    await sut.execute(editGoalTeste);

    expect(inMemoryGoalRepository.items[0]).toMatchObject({
      amount_in_cent: 124111,
      date: editGoalTeste.date,
    });
  });

  it("should not be able to edit a goal that does not exist", async () => {
    const result = await sut.execute({
      goal_id: "goal-1",
      amount_in_cent: 1241.11,
      date: new Date(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(GoalNotFoundError);
  });
});
