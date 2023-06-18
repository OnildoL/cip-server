import { Either, right } from "@/application/entities/either";
import { DevolutionItem } from "@/application/entities/devolution-item";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { DevolutionItemRepository } from "../ports/devolution-item-repository";

interface CreateDevolutionItemUseCaseRequest {
  devolution_id: UniqueEntityID;
  product_id: UniqueEntityID;
  date: Date;
  quantity: number;
  collected?: number;
  unitary_in_cent: number;
  amount_in_cent?: number;
  balance_in_cent?: number;
}

type CreateDevolutionItemUseCaseResponse = Either<null, DevolutionItem>;

export class CreateDevolutionItemUseCase {
  constructor(private devolutionitemRepository: DevolutionItemRepository) {}

  async execute({
    devolution_id,
    product_id,
    date,
    quantity,
    collected = 0,
    unitary_in_cent,
    amount_in_cent = 0,
    balance_in_cent = 0,
  }: CreateDevolutionItemUseCaseRequest): Promise<CreateDevolutionItemUseCaseResponse> {
    const devolutionitem = DevolutionItem.create({
      devolution_id,
      product_id,
      date,
      quantity,
      collected,
      unitary_in_cent: unitary_in_cent * 100,
      amount_in_cent: amount_in_cent * 100,
      balance_in_cent: balance_in_cent * 100,
    });

    await this.devolutionitemRepository.create(devolutionitem);

    return right(devolutionitem);
  }
}
