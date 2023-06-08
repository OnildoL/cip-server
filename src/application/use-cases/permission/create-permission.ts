import { Either, right } from "@/application/entities/either";
import { Permission } from "@/application/entities/permission";
import { PermissionRepository } from "../ports/permission-repository";

interface CreatePermissionUseCaseRequest {
  name: string;
  type: string;
}

type CreatePermissionUseCaseResponse = Either<null, Permission>;

export class CreatePermissionUseCase {
  constructor(private permissionRepository: PermissionRepository) {}

  async execute({
    name,
    type,
  }: CreatePermissionUseCaseRequest): Promise<CreatePermissionUseCaseResponse> {
    const permission = Permission.create({ name, type });

    await this.permissionRepository.create(permission);

    return right(permission);
  }
}
