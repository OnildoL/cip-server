import { GoalRepository } from "../ports/goal-repository";
import { Either, left, right } from "@/application/entities/either";
import { GoalNotFoundError } from "../errors/goal-not-found-error";

interface DeleteGoalUseCaseRequest {
  goal_id: string;
}

type DeleteGoalUseCaseResponse = Either<GoalNotFoundError, {}>;

export class DeleteGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute({
    goal_id,
  }: DeleteGoalUseCaseRequest): Promise<DeleteGoalUseCaseResponse> {
    const goal = await this.goalRepository.findById(goal_id);

    if (!goal) {
      return left(new GoalNotFoundError());
    }

    await this.goalRepository.delete(goal);

    return right({});
  }
}
