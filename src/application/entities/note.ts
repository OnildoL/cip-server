import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface NoteProps {
  company_id: UniqueEntityID;
  bond_id?: UniqueEntityID | null;
  provider_id: UniqueEntityID;
  access_key: string;
  amount_in_cent: number;
  nf: number;
  issue: Date;
  receive?: "RECEBER" | "PENDENTE" | "RECUSAR" | null;
  hangtag?: string | null;
  arrival?: Date | null;
  input?: Date | null;
  comment?: string | null;
}

export class Note extends Entity<NoteProps> {
  static create(props: NoteProps, id?: UniqueEntityID) {
    const note = new Note(props, id);

    return note;
  }

  get company_id() {
    return this.props.company_id;
  }

  get bond_id() {
    return this.props.bond_id;
  }

  set bond_id(bond_id) {
    this.props.bond_id = bond_id;
  }

  get provider_id() {
    return this.props.provider_id;
  }

  get access_key() {
    return this.props.access_key;
  }

  get amount_in_cent() {
    return this.props.amount_in_cent;
  }

  get nf() {
    return this.props.nf;
  }

  get issue() {
    return this.props.issue;
  }

  get receive() {
    return this.props.receive;
  }

  set receive(receive) {
    this.props.receive = receive;
  }

  get hangtag() {
    return this.props.hangtag;
  }

  set hangtag(hangtag) {
    this.props.hangtag = hangtag;
  }

  get arrival() {
    return this.props.arrival;
  }

  set arrival(arrival) {
    this.props.arrival = arrival;
  }

  get input() {
    return this.props.input;
  }

  set input(input) {
    this.props.input = input;
  }

  get comment() {
    return this.props.comment;
  }

  set comment(comment) {
    this.props.comment = comment;
  }
}
