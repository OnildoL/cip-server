import { Permission } from "@/application/entities/permission";

export interface PermissionRepository {
  create(permission: Permission): Promise<void>;
}
