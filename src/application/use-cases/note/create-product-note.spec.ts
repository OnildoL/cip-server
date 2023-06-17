import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryProductNoteRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-product-note-repository";
import { CreateProductNoteUseCase } from "./create-product-note";

let inMemoryProductNoteRepository: InMemoryProductNoteRepository;
let sut: CreateProductNoteUseCase;

describe("Create product note", () => {
  beforeEach(() => {
    inMemoryProductNoteRepository = new InMemoryProductNoteRepository();
    sut = new CreateProductNoteUseCase(inMemoryProductNoteRepository);
  });

  it("should be able to create a product note", async () => {
    const result = await sut.execute({
      product_id: new UniqueEntityID("1"),
      note_id: new UniqueEntityID("1"),
      quantity: 2,
      unitary_in_cent: 39.9,
      cfop: 6102,
      icms: 4,
      ipi: 9.75,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryProductNoteRepository.items[0].product_id).toEqual(
        result.value.product_id
      );
      expect(inMemoryProductNoteRepository.items[0].note_id).toEqual(
        result.value.note_id
      );
      expect(inMemoryProductNoteRepository.items[0].unitary_in_cent).toEqual(
        3990
      );
      expect(inMemoryProductNoteRepository.items[0].icms).toEqual(400);
      expect(inMemoryProductNoteRepository.items[0].ipi).toEqual(975);
    }
  });
});
