import { Goal } from "@/application/entities/goal";

export interface GoalRepository {
  findById(id: string): Promise<Goal | null>;
  create(goal: Goal): Promise<void>;
  save(goal: Goal): Promise<void>;
}
