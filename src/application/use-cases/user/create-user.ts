import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { ExistingUserError } from "../errors/existing-user-error";
import { User } from "@/application/entities/user";
import { Either, left, right } from "@/application/entities/either";
import { UserRepository } from "../ports/user-repository";
import { Password } from "@/application/entities/value-objects/password";
import { InvalidPasswordError } from "@/application/entities/errors/invalid-password-error";
import { BcryptEncoder } from "@/infrastructure/external/encoder/bcrypt-encoder";

interface CreateUserUseCaseRequest {
  company_id: UniqueEntityID;
  user: number;
  password: string;
  name: string;
  role: string;
}

type CreateUserUseCaseResponse = Either<ExistingUserError, User>;

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private encoderRepository: BcryptEncoder
  ) {}

  async execute({
    company_id,
    name,
    password,
    role,
    user,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userRegistered = await this.userRepository.findByUser(user);

    if (userRegistered) {
      return left(new ExistingUserError());
    }

    const passwordOrError = Password.create(password);

    if (passwordOrError.isLeft()) {
      return left(new InvalidPasswordError());
    }

    const password_hash = await this.encoderRepository.encode(password);

    const newUser = User.create({
      company_id,
      name,
      password: password_hash,
      role,
      user,
    });

    await this.userRepository.create(newUser);

    return right(newUser);
  }
}
