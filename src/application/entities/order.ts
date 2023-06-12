import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface OrderProps {
  company_id: UniqueEntityID;
  goal_id: UniqueEntityID;
  name: string;
  amount_in_cent: number;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class Order extends Entity<OrderProps> {
  static create(
    props: Optional<OrderProps, "created_at" | "updated_at">,
    id?: UniqueEntityID
  ) {
    const order = new Order(
      {
        ...props,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return order;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get company_id() {
    return this.props.company_id;
  }

  get goal_id() {
    return this.props.goal_id;
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
    this.touch();
  }

  get amount_in_cent() {
    return this.props.amount_in_cent;
  }

  set amount_in_cent(amountinCent) {
    this.props.amount_in_cent = amountinCent;
    this.touch();
  }

  get date() {
    return this.props.date;
  }

  set date(date) {
    this.props.date = date;
    this.touch();
  }

  get createdAt() {
    return this.props.created_at;
  }
}
