import { InMemoryPermissionRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-permission-repository";
import { CreatePermissionUseCase } from "./create-permission";
import { ExistingPermissionError } from "../errors/existing-permission-error";
import { InMemoryUserRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-user-repository";
import { makeUser } from "@/main/factories/test/make-user";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";

let inMemoryPermissionRepository: InMemoryPermissionRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreatePermissionUseCase;

describe("Create permission", () => {
  beforeEach(() => {
    inMemoryPermissionRepository = new InMemoryPermissionRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreatePermissionUseCase(
      inMemoryPermissionRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create a permission", async () => {
    const user = makeUser(true);

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      name: "GOAL",
      type: "CREATE",
      admin_id: new UniqueEntityID(user.id.toValue()),
    });

    expect(result.isRight()).toBe(true);
    expect(user.admin).toBe(true);

    if (result.isRight()) {
      expect(inMemoryPermissionRepository.items[0].name).toEqual(
        result.value.name
      );
    }
  });

  it("should not be able to create a permission that already exists", async () => {
    const user = makeUser(true);

    await inMemoryUserRepository.create(user);

    const permission = {
      name: "GOAL",
      type: "CREATE",
      admin_id: new UniqueEntityID(user.id.toValue()),
    };

    await sut.execute(permission);

    const result = await sut.execute(permission);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingPermissionError);
  });

  it("it should not be possible for a non-administrator to create a permission.", async () => {
    const user = makeUser(false);

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      name: "GOAL",
      type: "CREATE",
      admin_id: new UniqueEntityID(user.id.toValue()),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserisNotanAdmin);
  });
});
