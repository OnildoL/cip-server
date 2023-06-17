import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface ProductProps {
  reference: string;
  description: string;
  isbn: number;
}

export class Product extends Entity<ProductProps> {
  static create(props: ProductProps, id?: UniqueEntityID) {
    const product = new Product(props, id);

    return product;
  }

  get reference() {
    return this.props.reference;
  }

  set reference(reference) {
    this.props.reference = reference;
  }

  get description() {
    return this.props.description;
  }

  set description(description) {
    this.props.description = description;
  }

  get isbn() {
    return this.props.isbn;
  }

  set isbn(isbn) {
    this.props.isbn = isbn;
  }
}
