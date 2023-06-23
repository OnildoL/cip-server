import { InMemoryHitRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-hit-repository";
import { DeleteHitUseCase } from "./delete-hit";
import { makeHit } from "@/main/factories/test/make-hit";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

let inMemoryHitRepository: InMemoryHitRepository;
let sut: DeleteHitUseCase;

describe("Delete hit", () => {
  beforeEach(() => {
    inMemoryHitRepository = new InMemoryHitRepository();
    sut = new DeleteHitUseCase(inMemoryHitRepository);
  });

  it("should be able to delete a hit", async () => {
    const newHit = makeHit({}, new UniqueEntityID("hit-1"));

    await inMemoryHitRepository.create(newHit);

    await sut.execute({
      hit_id: newHit.id.toValue(),
    });

    expect(inMemoryHitRepository.items).toHaveLength(0);
  });
});
