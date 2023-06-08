import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface PermissionProps {
  name: string;
  type: string;
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
}
