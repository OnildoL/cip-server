import { Either, left, right } from "@/application/entities/either";
import { PermissionUser } from "@/application/entities/permision-user";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { PermissionUserRepository } from "../ports/permission-user-repository";
import { UserRepository } from "../ports/user-repository";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";

interface CreatePermissionUserUseCaseRequest {
  permission_id: UniqueEntityID;
  user_id: UniqueEntityID;
}

type CreatePermissionUserUseCaseResponse = Either<
  UserisNotanAdmin,
  PermissionUser
>;

export class CreatePermissionUserUseCase {
  constructor(
    private permissionUserRepository: PermissionUserRepository,
    private userRepository: UserRepository
  ) {}
  // Talvez colocar uma verificação se tal permissão já foi registrada para o usuário.
  async execute({
    permission_id,
    user_id,
  }: CreatePermissionUserUseCaseRequest): Promise<CreatePermissionUserUseCaseResponse> {
    const user = await this.userRepository.findById(user_id);

    if (!user?.admin) {
      return left(new UserisNotanAdmin());
    }

    const permissionUser = PermissionUser.create({
      permission_id,
      user_id,
    });

    await this.permissionUserRepository.create(permissionUser);

    return right(permissionUser);
  }
}
