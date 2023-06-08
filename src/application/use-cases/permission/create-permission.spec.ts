import { InMemoryPermissionRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-permission-repository";
import { CreatePermissionUseCase } from "./create-permission";
import { ExistingPermissionError } from "../errors/existing-permission-error";

let inMemoryPermissionRepository: InMemoryPermissionRepository;
let sut: CreatePermissionUseCase;

describe("Create permission", () => {
  beforeEach(() => {
    inMemoryPermissionRepository = new InMemoryPermissionRepository();
    sut = new CreatePermissionUseCase(inMemoryPermissionRepository);
  });

  it("should be able to create a permission", async () => {
    const result = await sut.execute({
      name: "GOAL",
      type: "CREATE",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryPermissionRepository.items[0].name).toEqual(
        result.value.name
      );
    }
  });

  it("should not be able to create a permission that already exists", async () => {
    const permission = { name: "GOAL", type: "CREATE" };

    await sut.execute(permission);

    const result = await sut.execute(permission);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingPermissionError);
  });
});
