import { Permission, PermissionProps } from "@/application/entities/permission";

export function makePermission(override?: Partial<PermissionProps>) {
  const permission = Permission.create({
    name: "PERMISSION",
    type: "CREATE",
    ...override,
  });

  return permission;
}
