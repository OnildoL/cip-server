import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface DevolutionProps {
  company_id: UniqueEntityID;
  status?: string | null;
  date: Date;
  last_devolution_date?: Date | null;
  current_devolution_date?: Date | null;
  last_devolution_tp?: "T" | "P" | null;
  current_devolution_tp?: "T" | "P" | null;
  balance_in_cent: number;
  consignation_total_value_in_cent?: number;
  total_devolution_in_cent?: number;
  new_consignment_value_in_cent?: number;
  new_consignment_date?: Date | null;
  filled?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class Devolution extends Entity<DevolutionProps> {
  static create(
    props: Optional<DevolutionProps, "created_at" | "updated_at">,
    id?: UniqueEntityID
  ) {
    const devolution = new Devolution(
      {
        ...props,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return devolution;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get company_id() {
    return this.props.company_id;
  }

  get status() {
    return this.props.status;
  }

  set status(status) {
    this.props.status = status;
    this.touch();
  }

  get date() {
    return this.props.date;
  }

  set date(date) {
    this.props.date = date;
    this.touch();
  }

  get last_devolution_date() {
    return this.props.last_devolution_date;
  }

  set last_devolution_date(last_devolution_date) {
    this.props.last_devolution_date = last_devolution_date;
    this.touch();
  }

  get current_devolution_date() {
    return this.props.current_devolution_date;
  }

  set current_devolution_date(current_devolution_date) {
    this.props.current_devolution_date = current_devolution_date;
    this.touch();
  }

  get last_devolution_tp() {
    return this.props.last_devolution_tp;
  }

  set last_devolution_tp(last_devolution_tp) {
    this.props.last_devolution_tp = last_devolution_tp;
    this.touch();
  }

  get current_devolution_tp() {
    return this.props.current_devolution_tp;
  }

  set current_devolution_tp(current_devolution_tp) {
    this.props.current_devolution_tp = current_devolution_tp;
    this.touch();
  }

  get balance_in_cent() {
    return this.props.balance_in_cent;
  }

  set balance_in_cent(balance_in_cent) {
    this.props.balance_in_cent = balance_in_cent;
    this.touch();
  }

  get consignation_total_value_in_cent() {
    return this.props.consignation_total_value_in_cent;
  }

  set consignation_total_value_in_cent(consignation_total_value_in_cent) {
    this.props.consignation_total_value_in_cent =
      consignation_total_value_in_cent;
    this.touch();
  }

  get total_devolution_in_cent() {
    return this.props.total_devolution_in_cent;
  }

  set total_devolution_in_cent(total_devolution_in_cent) {
    this.props.total_devolution_in_cent = total_devolution_in_cent;
    this.touch();
  }

  get new_consignment_value_in_cent() {
    return this.props.new_consignment_value_in_cent;
  }

  set new_consignment_value_in_cent(new_consignment_value_in_cent) {
    this.props.new_consignment_value_in_cent = new_consignment_value_in_cent;
    this.touch();
  }

  get new_consignment_date() {
    return this.props.new_consignment_date;
  }

  set new_consignment_date(new_consignment_date) {
    this.props.new_consignment_date = new_consignment_date;
    this.touch();
  }

  get filled() {
    return this.props.filled;
  }

  set filled(filled) {
    this.props.filled = filled;
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }
}
