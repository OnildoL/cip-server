import { InMemoryGoalRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-goal-repository";
import { makeGoal } from "@/main/factories/test/make-goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { makeCompany } from "@/main/factories/test/make-company";
import { FetchUniqueYearsUseCase } from "./fetch-unique-years";

let inMemoryGoalRepository: InMemoryGoalRepository;
let sut: FetchUniqueYearsUseCase;

describe("Fetch unique years", () => {
  beforeEach(() => {
    inMemoryGoalRepository = new InMemoryGoalRepository();
    sut = new FetchUniqueYearsUseCase(inMemoryGoalRepository);
  });

  it("should be able to fetch unique years", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));

    await inMemoryGoalRepository.create(
      makeGoal({
        company_id: company.id,
        date: new Date(2023, 0, 20),
      })
    );
    await inMemoryGoalRepository.create(
      makeGoal({
        company_id: company.id,
        date: new Date(2022, 10, 20),
      })
    );
    await inMemoryGoalRepository.create(
      makeGoal({
        company_id: company.id,
        date: new Date(2021, 11, 20),
      })
    );

    await inMemoryGoalRepository.create(
      makeGoal({
        company_id: new UniqueEntityID("new-company-2"),
        date: new Date(2020, 9, 20),
      })
    );

    const years = await sut.execute({
      company_id: company.id.toValue(),
    });

    if (years.isRight()) {
      expect(years.value).toEqual([2023, 2022, 2021]);
    }
  });
});
