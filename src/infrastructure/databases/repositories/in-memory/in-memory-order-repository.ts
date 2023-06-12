import { Order } from "@/application/entities/order";
import { OrderRepository } from "@/application/use-cases/ports/order-repository";

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = [];

  async create(order: Order) {
    this.items.push(order);
  }
}
