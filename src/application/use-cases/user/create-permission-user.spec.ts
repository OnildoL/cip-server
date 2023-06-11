import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryPermissionUserRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-permission-user-repository";
import { CreatePermissionUserUseCase } from "./create-permission-user";
import { InMemoryUserRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-user-repository";
import { makeUser } from "@/main/factories/test/make-user";
import { InMemoryCompanyRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-company-repository";
import { makePermission } from "@/main/factories/test/make-permission";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";

let inMemoryPermissionUserRepository: InMemoryPermissionUserRepository;
let inMemoryCompanyRepository: InMemoryCompanyRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreatePermissionUserUseCase;

describe("Create company sector", () => {
  beforeEach(() => {
    inMemoryPermissionUserRepository = new InMemoryPermissionUserRepository();
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreatePermissionUserUseCase(
      inMemoryPermissionUserRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create a permission user", async () => {
    const user = await makeUser(true);
    const permission = await makePermission();

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      permission_id: new UniqueEntityID(permission.id.toValue()),
      user_id: new UniqueEntityID(user.id.toValue()),
    });

    expect(result.isRight()).toBe(true);
    expect(user.admin).toBe(true);

    if (result.isRight()) {
      expect(inMemoryPermissionUserRepository.items[0].permission_id).toEqual(
        result.value.permission_id
      );
      expect(inMemoryPermissionUserRepository.items[0].user_id).toEqual(
        result.value.user_id
      );
    }
  });

  it("it should not be possible for a non-administrator to create a user permission.", async () => {
    const user = await makeUser(false);
    const permission = await makePermission();

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      permission_id: new UniqueEntityID(permission.id.toValue()),
      user_id: new UniqueEntityID(user.id.toValue()),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserisNotanAdmin);
  });
});
