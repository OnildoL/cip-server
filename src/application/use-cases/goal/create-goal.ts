import { Goal } from "@/application/entities/goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { GoalRepository } from "../ports/goal-repository";
import { Either, right } from "@/application/entities/either";

interface CreateGoalUseCaseRequest {
  company_id: UniqueEntityID;
  company_sector_id: UniqueEntityID;
  amount_in_cent: number;
  date: Date;
}

type CreateGoalUseCaseResponse = Either<null, Goal>;

export class CreateGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute({
    company_id,
    company_sector_id,
    amount_in_cent,
    date,
  }: CreateGoalUseCaseRequest): Promise<CreateGoalUseCaseResponse> {
    const goal = Goal.create({
      company_id,
      company_sector_id,
      amount_in_cent,
      date,
    });

    await this.goalRepository.create(goal);

    return right(goal);
  }
}
