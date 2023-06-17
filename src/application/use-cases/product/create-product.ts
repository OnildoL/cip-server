import { Either, left, right } from "@/application/entities/either";
import { Product } from "@/application/entities/product";
import { ProductRepository } from "../ports/product-repository";
import { ExistingProductError } from "../errors/existing-product-error";

interface CreateProductUseCaseRequest {
  reference: string;
  description: string;
  isbn: number;
}

type CreateProductUseCaseResponse = Either<ExistingProductError, Product>;

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    reference,
    description,
    isbn,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const productRegistered = await this.productRepository.findByIsbn(isbn);

    if (productRegistered) {
      return left(new ExistingProductError());
    }

    const product = Product.create({
      reference,
      description,
      isbn,
    });

    await this.productRepository.create(product);

    return right(product);
  }
}
