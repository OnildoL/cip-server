import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface ConferenceProps {
  product_note_id: UniqueEntityID;
  internal_code: number;
  quantity_typed?: number;
  checked?: number;
  multiplier?: number;
  created_at?: Date;
  updated_at?: Date;
}

export class Conference extends Entity<ConferenceProps> {
  static create(props: ConferenceProps, id?: UniqueEntityID) {
    const conference = new Conference(
      {
        ...props,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return conference;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get product_note_id() {
    return this.props.product_note_id;
  }

  get internal_code() {
    return this.props.internal_code;
  }

  set internal_code(internal_code) {
    this.props.internal_code = internal_code;
    this.touch();
  }

  get quantity_typed() {
    return this.props.quantity_typed;
  }

  set quantity_typed(quantity_typed) {
    this.props.quantity_typed = quantity_typed;
    this.touch();
  }

  get checked() {
    return this.props.checked;
  }

  set checked(checked) {
    this.props.checked = checked;
    this.touch();
  }

  get multiplier() {
    return this.props.multiplier;
  }

  set multiplier(multiplier) {
    this.props.multiplier = multiplier;
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }
}
