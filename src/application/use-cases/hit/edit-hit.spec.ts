import { InMemoryHitRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-hit-repository";
import { EditHitUseCase } from "./edit-hit";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { makeHit } from "@/main/factories/test/make-hit";
import { HitNotFoundError } from "../errors/hit-not-found-error";

let inMemoryHitRepository: InMemoryHitRepository;
let sut: EditHitUseCase;

describe("Edit hit", () => {
  beforeEach(() => {
    inMemoryHitRepository = new InMemoryHitRepository();
    sut = new EditHitUseCase(inMemoryHitRepository);
  });

  it("should be able to edit a hit", async () => {
    const newHit = makeHit({}, new UniqueEntityID("hit-1"));

    await inMemoryHitRepository.create(newHit);

    const editHitTeste = {
      hit_id: "hit-1",
      last_hit: new Date(),
      current_hit: new Date(),
      total_sale_in_cent: 1345.89,
      total_system_in_cent: 2455.9,
      reason: "9",
      situation: "OK",
      comment: "EXEMPLO DE COMENTARIO",
    };

    await sut.execute(editHitTeste);

    expect(inMemoryHitRepository.items[0].total_sale_in_cent).toEqual(134589);
    expect(inMemoryHitRepository.items[0].total_system_in_cent).toEqual(245590);
    expect(inMemoryHitRepository.items[0].reason).toEqual("9");
    expect(inMemoryHitRepository.items[0].situation).toEqual("OK");
    expect(inMemoryHitRepository.items[0].comment).toEqual(
      "EXEMPLO DE COMENTARIO"
    );
  });

  it("should not be able to edit a hit that does not exist", async () => {
    const result = await sut.execute({
      hit_id: "hit-1",
      last_hit: new Date(),
      current_hit: new Date(),
      total_sale_in_cent: 1345.89,
      total_system_in_cent: 2455.9,
      reason: "9",
      situation: "OK",
      comment: "EXEMPLO DE COMENTARIO",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(HitNotFoundError);
  });
});
