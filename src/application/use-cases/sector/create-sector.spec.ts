import { InMemorySectorRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-sector-repository";
import { CreateSectorUseCase } from "./create-sector";
import { ExistingSectorError } from "../errors/existing-sector-error";

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
      expect(inMemorySectorRepository.items[0].name).toEqual(result.value.name);
    }
  });

  it("should not be able to create a sector that already exists", async () => {
    const sector = { name: "NEW SECTOR EXAMPLE" };

    await sut.execute(sector);

    const result = await sut.execute(sector);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingSectorError);
  });
});
