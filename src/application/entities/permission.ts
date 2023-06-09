import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

export interface PermissionProps {
  name: string;
  type: string;
  admin_id?: UniqueEntityID;
}

export class Permission extends Entity<PermissionProps> {
  static create(props: PermissionProps, id?: UniqueEntityID) {
    const permission = new Permission(props, id);

    return permission;
  }

  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get admin_id() {
    return this.props.admin_id;
  }
}
