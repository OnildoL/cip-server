import { PermissionUser } from "@/application/entities/permision-user";

export interface PermissionUserRepository {
  create(permissionUser: PermissionUser): Promise<void>;
}
