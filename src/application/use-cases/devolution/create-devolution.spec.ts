import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryDevolutionRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-devolution-repository";
import { CreateDevolutionUseCase } from "./create-devolution";

let inMemoryDevolutionRepository: InMemoryDevolutionRepository;
let sut: CreateDevolutionUseCase;

describe("Create devolution", () => {
  beforeEach(() => {
    inMemoryDevolutionRepository = new InMemoryDevolutionRepository();
    sut = new CreateDevolutionUseCase(inMemoryDevolutionRepository);
  });

  it("should be able to create a devolution", async () => {
    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      date: new Date(),
      balance_in_cent: 3487.89,
      consignation_total_value_in_cent: 2487.89,
      total_devolution_in_cent: 2487.89,
      new_consignment_value_in_cent: 1487.89,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryDevolutionRepository.items[0].company_id).toEqual(
        result.value.company_id
      );
      expect(
        inMemoryDevolutionRepository.items[0].consignation_total_value_in_cent
      ).toEqual(248789);
      expect(inMemoryDevolutionRepository.items[0].balance_in_cent).toEqual(
        348789
      );
      expect(
        inMemoryDevolutionRepository.items[0].total_devolution_in_cent
      ).toEqual(248789);
      expect(
        inMemoryDevolutionRepository.items[0].new_consignment_value_in_cent
      ).toEqual(148789);
    }
  });
});
