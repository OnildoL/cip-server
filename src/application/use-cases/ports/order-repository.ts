import { Order } from "@/application/entities/order";

export interface OrderRepository {
  create(order: Order): Promise<void>;
}
