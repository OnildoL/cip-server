import { Devolution } from "@/application/entities/devolution";

export interface DevolutionRepository {
  create(devolution: Devolution): Promise<void>;
}
