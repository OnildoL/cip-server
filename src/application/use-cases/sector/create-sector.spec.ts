import { InMemorySectorRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-sector-repository";
import { CreateSectorUseCase } from "./create-sector";

let inMemorySectorRepository: InMemorySectorRepository;
let sut: CreateSectorUseCase;

describe("Create sector", () => {
  beforeEach(() => {
    inMemorySectorRepository = new InMemorySectorRepository();
    sut = new CreateSectorUseCase(inMemorySectorRepository);
  });

  it("should be able to create a sector", async () => {
    const result = await sut.execute({
      name: "NEW SECTOR EXAMPLE",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      console.log(result.value);
      expect(inMemorySectorRepository.items[0].name).toEqual(result.value.name);
    }
  });
});
