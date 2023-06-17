import { Product } from "@/application/entities/product";

export interface ProductRepository {
  findByIsbn(isbn: number): Promise<Product | null>;
  create(product: Product): Promise<void>;
}
