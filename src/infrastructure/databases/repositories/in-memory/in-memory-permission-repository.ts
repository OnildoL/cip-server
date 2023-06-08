import { Permission } from "@/application/entities/permission";
import { PermissionRepository } from "@/application/use-cases/ports/permission-repository";

export class InMemoryPermissionRepository implements PermissionRepository {
  public items: Permission[] = [];

  async create(permission: Permission) {
    this.items.push(permission);
  }
}
