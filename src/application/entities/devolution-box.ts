import { Optional } from "types/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface DevolutionBoxProps {
  devolution_item_id: UniqueEntityID;
  box: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

export class DevolutionBox extends Entity<DevolutionBoxProps> {
  static create(
    props: Optional<DevolutionBoxProps, "created_at" | "updated_at">,
    id?: UniqueEntityID
  ) {
    const devolutionBox = new DevolutionBox(
      {
        ...props,
        created_at: new Date(),
        updated_at: new Date(),
      },
      id
    );

    return devolutionBox;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  get devolution_item_id() {
    return this.props.devolution_item_id;
  }

  get box() {
    return this.props.box;
  }

  set box(box) {
    this.props.box = box;
    this.touch();
  }

  get quantity() {
    return this.props.quantity;
  }

  set quantity(quantity) {
    this.props.quantity = quantity;
    this.touch();
  }

  get created_at() {
    return this.props.created_at;
  }
}
