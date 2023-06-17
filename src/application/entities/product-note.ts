import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface ProductNoteProps {
  product_id: UniqueEntityID;
  note_id: UniqueEntityID;
  cfop: number;
  quantity: number;
  unitary_in_cent: number;
  icms: number;
  ipi: number;
  created_at?: Date;
}

export class ProductNote extends Entity<ProductNoteProps> {
  static create(props: ProductNoteProps, id?: UniqueEntityID) {
    const productnote = new ProductNote(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return productnote;
  }

  get product_id() {
    return this.props.product_id;
  }

  get note_id() {
    return this.props.note_id;
  }

  get cfop() {
    return this.props.cfop;
  }

  get quantity() {
    return this.props.quantity;
  }

  get unitary_in_cent() {
    return this.props.unitary_in_cent;
  }

  get icms() {
    return this.props.icms;
  }

  get ipi() {
    return this.props.ipi;
  }

  get created_at() {
    return this.props.created_at;
  }
}
