import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface CompanyProviderProps {
  company_id: UniqueEntityID;
  provider_id: UniqueEntityID;
  activated: boolean;
  discount?: number | null;
  map?: "SIM" | "NÃO" | null;
  shipping?: "CIF" | "FOB" | null;
}

export class CompanyProvider extends Entity<CompanyProviderProps> {
  static create(
    props: Optional<CompanyProviderProps, "activated">,
    id?: UniqueEntityID
  ) {
    const companyProvider = new CompanyProvider(
      {
        ...props,
        activated: true,
      },
      id
    );

    return companyProvider;
  }

  get company_id() {
    return this.props.company_id;
  }

  get provider_id() {
    return this.props.provider_id;
  }

  get activated() {
    return this.props.activated;
  }

  set activated(activated) {
    this.props.activated = activated;
  }

  get discount() {
    return this.props.discount;
  }

  set discount(discount) {
    this.props.discount = discount;
  }

  get map() {
    return this.props.map;
  }

  set map(map) {
    this.props.map = map;
  }

  get shipping() {
    return this.props.shipping;
  }

  set shipping(shipping) {
    this.props.shipping = shipping;
  }
}
