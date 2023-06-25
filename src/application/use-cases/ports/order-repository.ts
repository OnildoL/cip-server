import { Order } from "@/application/entities/order";

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  create(order: Order): Promise<void>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
}
