import { OrderRepository } from "../ports/order-repository";
import { OrderNotFoundError } from "../errors/order-not-found-error";
import { Either, left, right } from "@/application/entities/either";
import { Order } from "@/application/entities/order";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

interface EditOrderUseCaseRequest {
  order_id: string;
  goal_id: UniqueEntityID;
  name: string;
  amount_in_cent: number;
  date: Date;
  comment?: string | null;
}

type EditOrderUseCaseResponse = Either<OrderNotFoundError, { order: Order }>;

export class EditOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    order_id,
    goal_id,
    name,
    amount_in_cent,
    date,
    comment,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    order.goal_id = goal_id;
    order.name = name;
    order.amount_in_cent = amount_in_cent;
    order.date = date;
    order.comment = comment;

    await this.orderRepository.save(order);

    return right({ order });
  }
}
