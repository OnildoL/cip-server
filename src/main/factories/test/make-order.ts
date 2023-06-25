import { Order, OrderProps } from "@/application/entities/order";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export function makeOrder(override?: Partial<OrderProps>, id?: UniqueEntityID) {
  const order = Order.create(
    {
      company_id: new UniqueEntityID("1"),
      goal_id: new UniqueEntityID("new-goal-1"),
      name: "EXEMPLO DE PEDIDO",
      amount_in_cent: 1345.89,
      date: new Date(),
      comment: "EXEMPLO DE COMENTARIO",
      ...override,
    },
    id
  );

  return order;
}
