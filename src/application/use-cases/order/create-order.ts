import { Either, right } from "@/application/entities/either";
import { Order } from "@/application/entities/order";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { OrderRepository } from "../ports/order-repository";

interface CreateOrderUseCaseRequest {
  company_id: UniqueEntityID;
  goal_id: UniqueEntityID;
  name: string;
  amount_in_cent: number;
  date: Date;
}

type CreateOrderUseCaseResponse = Either<null, Order>;

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    company_id,
    goal_id,
    name,
    amount_in_cent,
    date,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      company_id,
      goal_id,
      name,
      amount_in_cent: amount_in_cent * 100,
      date,
    });

    await this.orderRepository.create(order);

    return right(order);
  }
}
