import { Order } from "@/application/entities/order";
import { OrderRepository } from "@/application/use-cases/ports/order-repository";

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = [];

  async findById(id: string) {
    const result = this.items.find((item) => item.id.toValue() === id);

    if (!result) {
      return null;
    }

    return result;
  }

  async create(order: Order) {
    this.items.push(order);
  }

  async save(order: Order) {
    const itemIndex = this.items.findIndex((item) => item.id === order.id);

    this.items[itemIndex] = order;
  }
}
