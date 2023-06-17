import { InMemoryNoteRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-note-repository";
import { CreateNoteUseCase } from "./create-note";
import { ExistingNoteError } from "../errors/existing-note-error";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

let inMemoryNoteRepository: InMemoryNoteRepository;
let sut: CreateNoteUseCase;

describe("Create note", () => {
  beforeEach(() => {
    inMemoryNoteRepository = new InMemoryNoteRepository();
    sut = new CreateNoteUseCase(inMemoryNoteRepository);
  });

  it("should be able to create a note", async () => {
    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      provider_id: new UniqueEntityID("1"),
      access_key: "25230608761132000148558939000687251853222169",
      amount_in_cent: 2542.56,
      issue: new Date(),
      nf: 900068725,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryNoteRepository.items[0].access_key).toEqual(
        result.value.access_key
      );
      expect(inMemoryNoteRepository.items[0].amount_in_cent).toEqual(254256);
    }
  });

  it("should not be able to create a note that already exists", async () => {
    const note = {
      company_id: new UniqueEntityID("1"),
      provider_id: new UniqueEntityID("1"),
      access_key: "25230608761132000148558939000687251853222169",
      amount_in_cent: 2542.56,
      issue: new Date(),
      nf: 900068725,
    };

    await sut.execute(note);

    const result = await sut.execute(note);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingNoteError);
  });
});
