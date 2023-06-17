import { Either, right } from "@/application/entities/either";
import { ProductNote } from "@/application/entities/product-note";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { ProductNoteRepository } from "../ports/product-note-repository";

interface CreateProductNoteUseCaseRequest {
  product_id: UniqueEntityID;
  note_id: UniqueEntityID;
  cfop: number;
  quantity: number;
  unitary_in_cent: number;
  icms: number;
  ipi: number;
}

type CreateProductNoteUseCaseResponse = Either<null, ProductNote>;

export class CreateProductNoteUseCase {
  constructor(private productNoteRepository: ProductNoteRepository) {}

  async execute({
    product_id,
    note_id,
    cfop,
    quantity,
    unitary_in_cent,
    icms,
    ipi,
  }: CreateProductNoteUseCaseRequest): Promise<CreateProductNoteUseCaseResponse> {
    const productNote = ProductNote.create({
      product_id,
      note_id,
      cfop,
      quantity,
      unitary_in_cent: unitary_in_cent * 100,
      icms,
      ipi,
    });

    await this.productNoteRepository.create(productNote);

    return right(productNote);
  }
}
