import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

export interface CompanyProps {
  name: string;
  cnpj: string;
  system_number: number;
  activated: boolean;
  admin_id?: UniqueEntityID;
  created_at?: Date;
  updated_at?: Date;
}

export class Company extends Entity<CompanyProps> {
  static create(
    props: Optional<CompanyProps, "activated" | "created_at" | "updated_at">,
    id?: UniqueEntityID
  ) {
    const company = new Company(
      {
        ...props,
        activated: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return company;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get name() {
    return this.props.name;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get system_number() {
    return this.props.system_number;
  }

  get activated() {
    return this.props.activated;
  }

  set activated(activated: boolean) {
    this.props.activated = activated;
    this.touch();
  }

  get admin_id() {
    return this.props.admin_id;
  }

  get created_at() {
    return this.props.created_at;
  }
}
