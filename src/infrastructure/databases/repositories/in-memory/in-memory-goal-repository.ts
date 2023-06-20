import { Goal } from "@/application/entities/goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { GoalRepository } from "@/application/use-cases/ports/goal-repository";

export class InMemoryGoalRepository implements GoalRepository {
  public items: Goal[] = [];

  async findById(id: string) {
    const result = this.items.find((item) => item.id.toValue() === id);

    if (!result) {
      return null;
    }

    return result;
  }

  async create(goal: Goal) {
    this.items.push(goal);
  }

  async save(goal: Goal) {
    const itemIndex = this.items.findIndex((item) => item.id === goal.id);

    this.items[itemIndex] = goal;
  }
}
