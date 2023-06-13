import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface ProviderProps {
  name: string;
  cnpj: string;
  system_number: number;
}

export class Provider extends Entity<ProviderProps> {
  static create(props: ProviderProps, id?: UniqueEntityID) {
    const provider = new Provider(props, id);

    return provider;
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
}
