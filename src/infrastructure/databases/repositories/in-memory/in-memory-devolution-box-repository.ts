import { DevolutionBox } from "@/application/entities/devolution-box";
import { DevolutionBoxRepository } from "@/application/use-cases/ports/devolution-box-repository";

export class InMemoryDevolutionBoxRepository
  implements DevolutionBoxRepository
{
  public items: DevolutionBox[] = [];

  async create(devolutionBox: DevolutionBox) {
    this.items.push(devolutionBox);
  }
}
