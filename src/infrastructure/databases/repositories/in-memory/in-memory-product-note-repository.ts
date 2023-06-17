import { ProductNote } from "@/application/entities/product-note";
import { ProductNoteRepository } from "@/application/use-cases/ports/product-note-repository";

export class InMemoryProductNoteRepository implements ProductNoteRepository {
  public items: ProductNote[] = [];

  async create(productNote: ProductNote): Promise<void> {
    this.items.push(productNote);
  }
}
