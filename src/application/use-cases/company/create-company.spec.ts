import { InMemoryCompanyRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-company-repository";
import { CreateCompanyUseCase } from "./create-company";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { ExistingCompanyError } from "../errors/existing-company-error";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let sut: CreateCompanyUseCase;

describe("Create company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    sut = new CreateCompanyUseCase(inMemoryCompanyRepository);
  });

  it("should be able to create a company", async () => {
    const result = await sut.execute({
      admin_id: new UniqueEntityID("1"),
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryCompanyRepository.items[0].cnpj).toEqual(
        result.value.cnpj
      );
    }
  });

  it("should not be able to create a company that already exists", async () => {
    const company = {
      admin_id: new UniqueEntityID("1"),
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
    };

    await sut.execute(company);

    const result = await sut.execute(company);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingCompanyError);
  });
});
