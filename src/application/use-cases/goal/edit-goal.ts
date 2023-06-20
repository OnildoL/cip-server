import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { GoalRepository } from "../ports/goal-repository";
import { GoalNotFoundError } from "../errors/goal-not-found-error";
import { Either, left, right } from "@/application/entities/either";
import { Goal } from "@/application/entities/goal";

interface EditGoalUseCaseRequest {
  goal_id: string;
  amount_in_cent: number;
  date: Date;
}

type EditGoalUseCaseResponse = Either<GoalNotFoundError, { goal: Goal }>;

export class EditGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute({
    goal_id,
    amount_in_cent,
    date,
  }: EditGoalUseCaseRequest): Promise<EditGoalUseCaseResponse> {
    const goal = await this.goalRepository.findById(goal_id);

    if (!goal) {
      return left(new GoalNotFoundError());
    }

    goal.amount_in_cent = amount_in_cent;
    goal.date = date;

    await this.goalRepository.save(goal);

    return right({ goal });
  }
}
