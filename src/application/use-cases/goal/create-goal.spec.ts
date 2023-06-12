import { InMemoryGoalRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-goal-repository";
import { CreateGoalUseCase } from "./create-goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

let inMemoryGoalRepository: InMemoryGoalRepository;
let sut: CreateGoalUseCase;

describe("Create goal", () => {
  beforeEach(() => {
    inMemoryGoalRepository = new InMemoryGoalRepository();
    sut = new CreateGoalUseCase(inMemoryGoalRepository);
  });

  it("should be able to create a goal", async () => {
    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      company_sector_id: new UniqueEntityID("1"),
      amount_in_cent: 2542.56,
      date: new Date(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryGoalRepository.items[0].company_id).toEqual(
        result.value.company_id
      );
      expect(inMemoryGoalRepository.items[0].company_sector_id).toEqual(
        result.value.company_sector_id
      );
      expect(inMemoryGoalRepository.items[0].amount_in_cent).toEqual(254256);
    }
  });
});
