import { InMemoryProductRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-product-repository";
import { CreateProductUseCase } from "./create-product";
import { ExistingProductError } from "../errors/existing-product-error";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: CreateProductUseCase;

describe("Create product", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new CreateProductUseCase(inMemoryProductRepository);
  });

  it("should be able to create a product", async () => {
    const result = await sut.execute({
      reference: "ASDF79",
      description: "NOME DO LIVRO, O",
      isbn: 9780311234567,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      console.log(result.value);
      expect(inMemoryProductRepository.items[0].isbn).toEqual(
        result.value.isbn
      );
    }
  });

  it("should not be able to create a product that already exists", async () => {
    const product = {
      reference: "ASDF79",
      description: "NOME DO LIVRO, O",
      isbn: 9780311234567,
    };

    await sut.execute(product);

    const result = await sut.execute(product);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ExistingProductError);
  });
});
