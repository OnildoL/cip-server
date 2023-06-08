import { Permission } from "@/application/entities/permission";

export interface PermissionRepository {
  findByName(name: string, type: string): Promise<Permission | null>;
  create(permission: Permission): Promise<void>;
}
