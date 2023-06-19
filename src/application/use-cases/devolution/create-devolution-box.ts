import { Either, right } from "@/application/entities/either";
import { DevolutionBox } from "@/application/entities/devolution-box";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { DevolutionBoxRepository } from "../ports/devolution-box-repository";

interface CreateDevolutionBoxUseCaseRequest {
  devolution_item_id: UniqueEntityID;
  box: number;
  quantity: number;
}

type CreateDevolutionBoxUseCaseResponse = Either<null, DevolutionBox>;

export class CreateDevolutionBoxUseCase {
  constructor(private devolutionBoxRepository: DevolutionBoxRepository) {}

  async execute({
    devolution_item_id,
    box,
    quantity,
  }: CreateDevolutionBoxUseCaseRequest): Promise<CreateDevolutionBoxUseCaseResponse> {
    const devolutionBox = DevolutionBox.create({
      devolution_item_id,
      box,
      quantity,
    });

    await this.devolutionBoxRepository.create(devolutionBox);

    return right(devolutionBox);
  }
}
