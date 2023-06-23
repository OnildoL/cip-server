import { Goal, GoalProps } from "@/application/entities/goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export function makeGoal(override?: Partial<GoalProps>, id?: UniqueEntityID) {
  const goal = Goal.create(
    {
      company_id: new UniqueEntityID("1"),
      company_sector_id: new UniqueEntityID("1"),
      amount_in_cent: 1155.15,
      date: new Date(),
      ...override,
    },
    id
  );

  return goal;
}
