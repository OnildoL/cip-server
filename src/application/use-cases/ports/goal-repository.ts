import { Goal } from "@/application/entities/goal";

export interface GoalRepository {
  findById(id: string): Promise<Goal | null>;
  findMany(companySectorId: string, date: number): Promise<Goal[]>;
  create(goal: Goal): Promise<void>;
  save(goal: Goal): Promise<void>;
  delete(goal: Goal): Promise<void>;
}
