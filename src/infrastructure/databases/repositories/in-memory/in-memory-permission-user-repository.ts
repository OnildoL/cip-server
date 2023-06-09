import { PermissionUser } from "@/application/entities/permision-user";
import { PermissionUserRepository } from "@/application/use-cases/ports/permission-user-repository";

export class InMemoryPermissionUserRepository
  implements PermissionUserRepository
{
  public items: PermissionUser[] = [];

  async create(permissionUser: PermissionUser) {
    this.items.push(permissionUser);
  }
}
