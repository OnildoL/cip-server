import { Either, left, right } from "@/application/entities/either";
import { Permission } from "@/application/entities/permission";
import { PermissionRepository } from "../ports/permission-repository";
import { ExistingPermissionError } from "../errors/existing-permission-error";

interface CreatePermissionUseCaseRequest {
  name: string;
  type: string;
}

type CreatePermissionUseCaseResponse = Either<
  ExistingPermissionError,
  Permission
>;

export class CreatePermissionUseCase {
  constructor(private permissionRepository: PermissionRepository) {}

  async execute({
    name,
    type,
  }: CreatePermissionUseCaseRequest): Promise<CreatePermissionUseCaseResponse> {
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
