import { Goal } from "@/application/entities/goal";
import { GoalRepository } from "@/application/use-cases/ports/goal-repository";

export class InMemoryGoalRepository implements GoalRepository {
  public items: Goal[] = [];

  async findManyUniqueYears(companyId: string) {
    const uniqueYears = new Set<number>();

    this.items
      .filter((item) => item.company_id.toValue() === companyId)
      .forEach((item) => {
        const year = item.date.getFullYear();

        uniqueYears.add(year);
      });

    return Array.from(uniqueYears);
  }

  async findById(id: string) {
    const result = this.items.find((item) => item.id.toValue() === id);

    if (!result) {
      return null;
    }

    return result;
  }

  async findMany(companySectorId: string, date: number) {
    const goals = this.items.filter(
      (item) =>
        item.date.getFullYear() === date &&
        item.company_sector_id.toValue() === companySectorId
    );

    return goals;
  }

  async create(goal: Goal) {
    this.items.push(goal);
  }

  async save(goal: Goal) {
    const itemIndex = this.items.findIndex((item) => item.id === goal.id);

    this.items[itemIndex] = goal;
  }

  async delete(goal: Goal) {
    const itemIndex = this.items.findIndex((item) => item.id === goal.id);

    this.items.splice(itemIndex, 1);
  }
}
