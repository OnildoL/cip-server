import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

export interface HitProps {
  company_id: UniqueEntityID;
  last_hit?: Date | null;
  current_hit?: Date | null;
  total_sale_in_cent: number;
  total_system_in_cent: number;
  reason?: string | null;
  situation?: string | null;
  date: Date;
  comment?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export class Hit extends Entity<HitProps> {
  static create(
    props: Optional<HitProps, "created_at" | "updated_at">,
    id?: UniqueEntityID
  ) {
    const hit = new Hit(
      {
        ...props,
        total_sale_in_cent: convertValuetoCents(props.total_sale_in_cent),
        total_system_in_cent: convertValuetoCents(props.total_system_in_cent),
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return hit;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get company_id() {
    return this.props.company_id;
  }

  get last_hit() {
    return this.props.last_hit;
  }

  set last_hit(lastHit) {
    this.props.last_hit = lastHit;
    this.touch();
  }

  get current_hit() {
    return this.props.current_hit;
  }

  set current_hit(currentHit) {
    this.props.current_hit = currentHit;
    this.touch();
  }

  get total_sale_in_cent() {
    return this.props.total_sale_in_cent;
  }

  set total_sale_in_cent(totalSaleinCent) {
    this.props.total_sale_in_cent = convertValuetoCents(totalSaleinCent);
    this.touch();
  }

  get total_system_in_cent() {
    return this.props.total_system_in_cent;
  }

  set total_system_in_cent(totalSysteminCent) {
    this.props.total_system_in_cent = convertValuetoCents(totalSysteminCent);
    this.touch();
  }

  get reason() {
    return this.props.reason;
  }

  set reason(reason) {
    this.props.reason = reason;
    this.touch();
  }

  get situation() {
    return this.props.situation;
  }

  set situation(situation) {
    this.props.situation = situation;
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

function convertValuetoCents(value: number) {
  const correctingDecimalPlacesandConvertingtoNumber = Number(
    (value * 100).toFixed(2)
  );

  return correctingDecimalPlacesandConvertingtoNumber;
}
