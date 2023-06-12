import { Goal } from "@/application/entities/goal";
import { GoalRepository } from "@/application/use-cases/ports/goal-repository";

export class InMemoryGoalRepository implements GoalRepository {
  public items: Goal[] = [];

  async create(goal: Goal) {
    this.items.push(goal);
  }
}
