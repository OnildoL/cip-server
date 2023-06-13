import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";
import { Password } from "./value-objects/password";

export interface UserProps {
  company_id: UniqueEntityID;
  user: number;
  password: Password;
  name: string;
  role: string;
  activated: boolean;
  admin: boolean;
  created_at?: Date;
  updated_at?: Date;
  admin_id?: UniqueEntityID;
}

export class User extends Entity<UserProps> {
  static create(
    props: Optional<
      UserProps,
      "admin" | "activated" | "created_at" | "updated_at"
    >,
    id?: UniqueEntityID
  ) {
    const user = new User(
      {
        ...props,
        admin: false,
        activated: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return user;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get company_id() {
    return this.props.company_id;
  }

  set company_id(companyId: UniqueEntityID) {
    this.props.company_id = companyId;
    this.touch();
  }

  get user() {
    return this.props.user;
  }

  get password() {
    return this.props.password;
  }

  set password(password: Password) {
    this.props.password = password;
    this.touch();
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get role() {
    return this.props.role;
  }

  set role(role: string) {
    this.props.role = role;
    this.touch();
  }

  get activated() {
    return this.props.activated;
  }

  set activated(activated: boolean) {
    this.props.activated = activated;
    this.touch();
  }

  get admin() {
    return this.props.admin;
  }

  set admin(admin: boolean) {
    this.props.admin = admin;
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }
}
