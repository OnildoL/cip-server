import { Order } from "@/application/entities/order";
import {
  OrderParams,
  OrderRepository,
} from "@/application/use-cases/ports/order-repository";

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = [];

  async findById(id: string) {
    const result = this.items.find((item) => item.id.toValue() === id);

    if (!result) {
      return null;
    }

    return result;
  }

  async findMany({ page, goalId, year }: OrderParams) {
    const orders = this.items
      .filter((item) => {
        return (
          item.goal_id.toValue() === goalId && item.date.getFullYear() === year
        );
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice((page - 1) * 20, page * 20);

    return orders;
  }

  async create(order: Order) {
    this.items.push(order);
  }

  async save(order: Order) {
    const itemIndex = this.items.findIndex((item) => item.id === order.id);

    this.items[itemIndex] = order;
  }

  async delete(order: Order) {
    const itemIndex = this.items.findIndex((item) => item.id === order.id);

    this.items.splice(itemIndex, 1);
  }
}
