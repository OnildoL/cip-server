import { InMemoryCompanyRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-company-repository";
import { CreateCompanyUseCase } from "./create-company";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { ExistingCompanyError } from "../errors/existing-company-error";
import { InMemoryUserRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-user-repository";
import { makeUser } from "@/main/factories/test/make-user";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateCompanyUseCase;

describe("Create company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreateCompanyUseCase(
      inMemoryCompanyRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create a company", async () => {
    const user = await makeUser(true);

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      admin_id: new UniqueEntityID(user.id.toValue()),
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
    });

    expect(result.isRight()).toBe(true);
    expect(user.admin).toBe(true);

    if (result.isRight()) {
      expect(inMemoryCompanyRepository.items[0].cnpj).toEqual(
        result.value.cnpj
      );
    }
  });

  it("should not be able to create a company that already exists", async () => {
    const user = await makeUser(true);

    await inMemoryUserRepository.create(user);

    const company = {
      admin_id: new UniqueEntityID(user.id.toValue()),
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
    };

    await sut.execute(company);

    const result = await sut.execute(company);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingCompanyError);
  });

  it("it should not be possible for a non-administrator to create a company.", async () => {
    const user = await makeUser(false);

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      admin_id: new UniqueEntityID(user.id.toValue()),
      name: "NEW COMPANY EXAMPLE",
      cnpj: "80.557.730/0001-27",
      system_number: 123456,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserisNotanAdmin);
  });
});
