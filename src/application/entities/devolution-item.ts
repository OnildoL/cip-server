import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface DevolutionItemProps {
  devolution_id: UniqueEntityID;
  product_id: UniqueEntityID;
  date: Date;
  quantity: number;
  collected?: number;
  unitary_in_cent: number;
  amount_in_cent?: number;
  balance_in_cent?: number;
  created_at?: Date;
  updated_at?: Date;
}

export class DevolutionItem extends Entity<DevolutionItemProps> {
  static create(
    props: Optional<DevolutionItemProps, "created_at" | "updated_at">,
    id?: UniqueEntityID
  ) {
    const devolutionitem = new DevolutionItem(
      {
        ...props,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return devolutionitem;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get devolution_id() {
    return this.props.devolution_id;
  }

  get product_id() {
    return this.props.product_id;
  }

  get date() {
    return this.props.date;
  }

  set date(date) {
    this.props.date = date;
    this.touch();
  }

  get quantity() {
    return this.props.quantity;
  }

  set quantity(quantity) {
    this.props.quantity = quantity;
    this.touch();
  }

  get collected() {
    return this.props.collected;
  }

  set collected(collected) {
    this.props.collected = collected;
    this.touch();
  }

  get unitary_in_cent() {
    return this.props.unitary_in_cent;
  }

  set unitary_in_cent(unitary_in_cent) {
    this.props.unitary_in_cent = unitary_in_cent;
    this.touch();
  }

  get amount_in_cent() {
    return this.props.amount_in_cent;
  }

  set amount_in_cent(amount_in_cent) {
    this.props.amount_in_cent = amount_in_cent;
    this.touch();
  }

  get balance_in_cent() {
    return this.props.balance_in_cent;
  }

  get created_at() {
    return this.props.created_at;
  }
}
