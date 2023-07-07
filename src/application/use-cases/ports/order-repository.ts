import { Order } from "@/application/entities/order";

export interface OrderParams {
  goalId: string;
  year: number;
  page: number;
}

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findMany(params: OrderParams): Promise<Order[]>;
  create(order: Order): Promise<void>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
}
