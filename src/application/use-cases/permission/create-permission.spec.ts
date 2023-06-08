import { InMemoryPermissionRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-permission-repository";
import { CreatePermissionUseCase } from "./create-permission";

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
});
