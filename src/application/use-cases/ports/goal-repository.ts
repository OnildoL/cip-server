import { Goal } from "@/application/entities/goal";

export interface GoalRepository {
  create(goal: Goal): Promise<void>;
}
