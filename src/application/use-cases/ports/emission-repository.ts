import { Emission } from "@/application/entities/emission";

export interface EmissionRepository {
  create(emission: Emission): Promise<void>;
}
