import { Either, right } from "@/application/entities/either";
import { OrderRepository } from "../ports/order-repository";
import { Order } from "@/application/entities/order";

interface FetchOrdersUseCaseRequest {
  year: number;
  goalId: string;
  page: number;
}

type FetchOrdersUseCaseResponse = Either<null, Order[]>;

export class FetchOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}
  async execute({
    year,
    goalId,
    page,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const years = await this.orderRepository.findMany({
      year,
      goalId,
      page,
    });

    return right(years);
  }
}
