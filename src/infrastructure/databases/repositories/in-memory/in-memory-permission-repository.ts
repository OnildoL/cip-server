import { Permission } from "@/application/entities/permission";
import { PermissionRepository } from "@/application/use-cases/ports/permission-repository";

export class InMemoryPermissionRepository implements PermissionRepository {
  public items: Permission[] = [];

  async findByName(name: string, type: string) {
    const permission = this.items.find(
      (item) => item.name === name && item.type === type
    );

    if (!permission) {
      return null;
    }

    return permission;
  }

  async create(permission: Permission) {
    this.items.push(permission);
  }
}
