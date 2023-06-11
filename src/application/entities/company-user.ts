import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface CompanyUserProps {
  company_id: UniqueEntityID;
  user_id: UniqueEntityID;
  admin_id?: UniqueEntityID;
}

export class CompanyUser extends Entity<CompanyUserProps> {
  static create(props: CompanyUserProps, id?: UniqueEntityID) {
    const companyUser = new CompanyUser(props, id);

    return companyUser;
  }

  get company_id() {
    return this.props.company_id;
  }

  get user_id() {
    return this.props.user_id;
  }

  get admin_id() {
    return this.props.admin_id;
  }
}
