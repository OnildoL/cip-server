import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface EmissionProps {
  bond_id: UniqueEntityID;
  nf: number;
  comment?: string | null;
}

export class Emission extends Entity<EmissionProps> {
  static create(props: EmissionProps, id?: UniqueEntityID) {
    const emission = new Emission(props, id);

    return emission;
  }

  get bond_id() {
    return this.props.bond_id;
  }

  get nf() {
    return this.props.nf;
  }

  set nf(nf) {
    this.props.nf = nf;
  }

  get comment() {
    return this.props.comment;
  }

  set comment(comment) {
    this.props.comment = comment;
  }
}
