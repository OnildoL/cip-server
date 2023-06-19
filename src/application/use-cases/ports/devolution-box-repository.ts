import { DevolutionBox } from "@/application/entities/devolution-box";

export interface DevolutionBoxRepository {
  create(devolutionBox: DevolutionBox): Promise<void>;
}
