import { Either, right } from "@/application/entities/either";
import { Devolution } from "@/application/entities/devolution";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { DevolutionRepository } from "../ports/devolution-repository";

interface CreateDevolutionUseCaseRequest {
  company_id: UniqueEntityID;
  status?: string | null;
  date: Date;
  last_devolution_date?: Date | null;
  current_devolution_date?: Date | null;
  last_devolution_tp?: "T" | "P" | null;
  current_devolution_tp?: "T" | "P" | null;
  balance_in_cent: number;
  consignation_total_value_in_cent?: number;
  total_devolution_in_cent?: number;
  new_consignment_value_in_cent?: number;
  new_consignment_date?: Date | null;
}

type CreateDevolutionUseCaseResponse = Either<null, Devolution>;

export class CreateDevolutionUseCase {
  constructor(private devolutionRepository: DevolutionRepository) {}

  async execute({
    company_id,
    status = null,
    date,
    last_devolution_date = null,
    current_devolution_date = null,
    last_devolution_tp = null,
    current_devolution_tp = null,
    balance_in_cent,
    consignation_total_value_in_cent = 0,
    total_devolution_in_cent = 0,
    new_consignment_value_in_cent = 0,
    new_consignment_date = null,
  }: CreateDevolutionUseCaseRequest): Promise<CreateDevolutionUseCaseResponse> {
    const devolution = Devolution.create({
      company_id,
      status,
      date,
      last_devolution_date,
      current_devolution_date,
      last_devolution_tp,
      current_devolution_tp,
      balance_in_cent: balance_in_cent * 100,
      consignation_total_value_in_cent: consignation_total_value_in_cent * 100,
      total_devolution_in_cent: total_devolution_in_cent * 100,
      new_consignment_value_in_cent: new_consignment_value_in_cent * 100,
      new_consignment_date,
    });

    await this.devolutionRepository.create(devolution);

    return right(devolution);
  }
}
