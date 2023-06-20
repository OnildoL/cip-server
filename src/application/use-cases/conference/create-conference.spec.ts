import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryConferenceRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-conference-repository";
import { CreateConferenceUseCase } from "./create-conference";

let inMemoryConferenceRepository: InMemoryConferenceRepository;
let sut: CreateConferenceUseCase;

describe("Create conference", () => {
  beforeEach(() => {
    inMemoryConferenceRepository = new InMemoryConferenceRepository();
    sut = new CreateConferenceUseCase(inMemoryConferenceRepository);
  });

  it("should be able to create a conference", async () => {
    const result = await sut.execute({
      product_note_id: new UniqueEntityID("1"),
      internal_code: 7890312343554,
      checked: 2,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryConferenceRepository.items[0].internal_code).toEqual(
        result.value.internal_code
      );
      expect(inMemoryConferenceRepository.items[0].checked).toEqual(2);
    }
  });
});
