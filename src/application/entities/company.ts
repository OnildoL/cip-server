import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface CompanyProps {
  name: string;
  cnpj: string;
  system_number: number;
  admin_id: UniqueEntityID;
  created_at?: Date;
}

export class Company extends Entity<CompanyProps> {
  static create(
    props: Optional<CompanyProps, "created_at">,
    id?: UniqueEntityID
  ) {
    const company = new Company(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return company;
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

  get adminId() {
    return this.props.admin_id;
  }

  get createdAt() {
    return this.props.created_at;
  }
}
