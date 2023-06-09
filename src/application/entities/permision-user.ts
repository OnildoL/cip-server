import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface PermissionUserProps {
  permission_id: UniqueEntityID;
  user_id: UniqueEntityID;
}

export class PermissionUser extends Entity<PermissionUserProps> {
  static create(props: PermissionUserProps, id?: UniqueEntityID) {
    const permissionUser = new PermissionUser(props, id);

    return permissionUser;
  }

  get permission_id() {
    return this.props.permission_id;
  }

  get user_id() {
    return this.props.user_id;
  }
}
