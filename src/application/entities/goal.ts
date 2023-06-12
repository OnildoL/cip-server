import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface GoalProps {
  company_id: UniqueEntityID;
  company_sector_id: UniqueEntityID;
  amount_in_cent: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export class Goal extends Entity<GoalProps> {
  static create(
    props: Optional<GoalProps, "created_at" | "updated_at">,
    id?: UniqueEntityID
  ) {
    const goal = new Goal(
      {
        ...props,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return goal;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get company_id() {
    return this.props.company_id;
  }

  get company_sector_id() {
    return this.props.company_sector_id;
  }

  set company_sector_id(companySectorId) {
    this.props.company_sector_id = companySectorId;
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
