import { OrderRepository } from "../ports/order-repository";
import { Either, left, right } from "@/application/entities/either";
import { OrderNotFoundError } from "../errors/order-not-found-error";

interface DeleteOrderUseCaseRequest {
  order_id: string;
}

type DeleteOrderUseCaseResponse = Either<OrderNotFoundError, {}>;

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    order_id,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    await this.orderRepository.delete(order);

    return right({});
  }
}
