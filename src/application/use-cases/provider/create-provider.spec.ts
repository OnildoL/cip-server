import { InMemoryProviderRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-provider-repository";
import { CreateProviderUseCase } from "./create-provider";
import { ExistingProviderError } from "../errors/existing-provider-error";

let inMemoryProviderRepository: InMemoryProviderRepository;
let sut: CreateProviderUseCase;

describe("Create provider", () => {
  beforeEach(() => {
    inMemoryProviderRepository = new InMemoryProviderRepository();
    sut = new CreateProviderUseCase(inMemoryProviderRepository);
  });

  it("should be able to create a provider", async () => {
    const result = await sut.execute({
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryProviderRepository.items[0].cnpj).toEqual(
        result.value.cnpj
      );
    }
  });

  it("should not be able to create a provider that already exists", async () => {
    const provider = {
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
    };

    await sut.execute(provider);

    const result = await sut.execute(provider);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingProviderError);
  });
});
