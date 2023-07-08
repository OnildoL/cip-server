import { Devolution } from "@/application/entities/devolution";

export interface DevolutionParams {
  companyId: string;
  year: number;
  page: number;
}

export interface DevolutionRepository {
  findMany(params: DevolutionParams): Promise<Devolution[]>;
  create(devolution: Devolution): Promise<void>;
}
