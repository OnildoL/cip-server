import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryCompanyProviderRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-company-provider-repository";
import { CreateCompanyProviderUseCase } from "./create-company-provider";

let inMemoryCompanyProviderRepository: InMemoryCompanyProviderRepository;
let sut: CreateCompanyProviderUseCase;

describe("Create company provider", () => {
  beforeEach(() => {
    inMemoryCompanyProviderRepository = new InMemoryCompanyProviderRepository();
    sut = new CreateCompanyProviderUseCase(inMemoryCompanyProviderRepository);
  });

  it("should be able to create a company provider", async () => {
    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      provider_id: new UniqueEntityID("1"),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryCompanyProviderRepository.items[0].company_id).toEqual(
        result.value.company_id
      );
      expect(inMemoryCompanyProviderRepository.items[0].provider_id).toEqual(
        result.value.provider_id
      );
    }
  });
});
