import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";
import { convertValuetoCents } from "../library/convert-value-to-cents";

export interface OrderProps {
  company_id: UniqueEntityID;
  goal_id: UniqueEntityID;
  name: string;
  amount_in_cent: number;
  date: Date;
  comment?: string | null;
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
        amount_in_cent: convertValuetoCents(props.amount_in_cent),
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

  set goal_id(goal_id) {
    this.props.goal_id = goal_id;
    this.touch();
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
    this.props.amount_in_cent = convertValuetoCents(amountinCent);
    this.touch();
  }

  get date() {
    return this.props.date;
  }

  set date(date) {
    this.props.date = date;
    this.touch();
  }

  get comment() {
    return this.props.comment;
  }

  set comment(comment) {
    this.props.comment = comment;
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }
}
