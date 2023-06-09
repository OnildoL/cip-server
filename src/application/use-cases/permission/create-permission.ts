import { Either, left, right } from "@/application/entities/either";
import { Permission } from "@/application/entities/permission";
import { PermissionRepository } from "../ports/permission-repository";
import { ExistingPermissionError } from "../errors/existing-permission-error";
import { UserisNotanAdmin } from "../errors/user-is-not-an-admin";
import { UserRepository } from "../ports/user-repository";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

interface CreatePermissionUseCaseRequest {
  name: string;
  type: string;
  admin_id: UniqueEntityID;
}

type CreatePermissionUseCaseResponse = Either<
  ExistingPermissionError,
  Permission
>;

export class CreatePermissionUseCase {
  constructor(
    private permissionRepository: PermissionRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    name,
    type,
    admin_id,
  }: CreatePermissionUseCaseRequest): Promise<CreatePermissionUseCaseResponse> {
    const user = await this.userRepository.findById(admin_id);

    if (!user?.admin) {
      return left(new UserisNotanAdmin());
    }

    const permissionRegistered = await this.permissionRepository.findByName(
      name,
      type
    );

    if (permissionRegistered) {
      return left(new ExistingPermissionError());
    }

    const permission = Permission.create({ name, type });

    await this.permissionRepository.create(permission);

    return right(permission);
  }
}
