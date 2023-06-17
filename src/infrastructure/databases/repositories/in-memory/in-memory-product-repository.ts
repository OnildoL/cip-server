import { Product } from "@/application/entities/product";
import { ProductRepository } from "@/application/use-cases/ports/product-repository";

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  async findByIsbn(isbn: number) {
    const product = this.items.find((item) => item.isbn === isbn);

    if (!product) {
      return null;
    }

    return product;
  }

  async create(product: Product) {
    this.items.push(product);
  }
}
