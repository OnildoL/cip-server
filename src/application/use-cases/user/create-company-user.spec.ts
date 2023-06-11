import { InMemoryCompanyUserRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-company-user-repository";
import { InMemoryUserRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-user-repository";
import { CreateCompanyUserUseCase } from "./create-company-user";
import { makeUser } from "@/main/factories/test/make-user";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";

let inMemoryCompanyUserRepository: InMemoryCompanyUserRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateCompanyUserUseCase;

describe("Create company user", () => {
  beforeEach(() => {
    inMemoryCompanyUserRepository = new InMemoryCompanyUserRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreateCompanyUserUseCase(
      inMemoryCompanyUserRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create a company user.", async () => {
    const user = await makeUser(true);

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      user_id: new UniqueEntityID("1"),
      admin_id: new UniqueEntityID(user.id.toValue()),
    });

    expect(result.isRight()).toBe(true);
    expect(user.admin).toBe(true);

    if (result.isRight()) {
      expect(inMemoryCompanyUserRepository.items[0].company_id).toEqual(
        result.value.company_id
      );
      expect(inMemoryCompanyUserRepository.items[0].user_id).toEqual(
        result.value.user_id
      );
    }
  });

  it("it should not be possible for a non-administrator to create a company user.", async () => {
    const user = await makeUser(false);

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      user_id: new UniqueEntityID("1"),
      admin_id: new UniqueEntityID(user.id.toValue()),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserisNotanAdmin);
  });
});
