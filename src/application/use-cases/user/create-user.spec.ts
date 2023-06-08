import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { InMemoryUserRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-user-repository";
import { CreateUserUseCase } from "./create-user";
import { ExistingUserError } from "../errors/existing-user-error";
import { BcryptEncoder } from "@/infrastructure/external/encoder/bcrypt-encoder";

let inMemoryUserRepository: InMemoryUserRepository;
let encoderRepository: BcryptEncoder;
let sut: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    encoderRepository = new BcryptEncoder(6);
    sut = new CreateUserUseCase(inMemoryUserRepository, encoderRepository);
  });

  it("should be able to create a user", async () => {
    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      user: 3145,
      name: "NEW USER EXAMPLE",
      password: "123456",
      role: "COORDINATOR",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(inMemoryUserRepository.items[0].user).toEqual(result.value.user);
    }
  });

  it("should not be able to create a user that already exists", async () => {
    const user = {
      company_id: new UniqueEntityID("1"),
      user: 3145,
      name: "NEW USER EXAMPLE",
      password: "123456",
      role: "COORDINATOR",
    };

    await sut.execute(user);

    const result = await sut.execute(user);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingUserError);
  });

  it("should hash user password upon registration", async () => {
    const password = "123456";
    const result = await sut.execute({
      company_id: new UniqueEntityID("1"),
      user: 3145,
      name: "NEW USER EXAMPLE",
      password,
      role: "COORDINATOR",
    });

    if (result.isRight()) {
      const isPasswordCorrectlyHashed = await encoderRepository.compare(
        password,
        result.value.password.value
      );

      expect(isPasswordCorrectlyHashed).toBe(true);
    }
  });
});
