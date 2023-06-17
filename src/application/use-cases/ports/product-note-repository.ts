import { ProductNote } from "@/application/entities/product-note";

export interface ProductNoteRepository {
  create(productNote: ProductNote): Promise<void>;
}
