import { DevolutionItem } from "@/application/entities/devolution-item";
import { DevolutionItemRepository } from "@/application/use-cases/ports/devolution-item-repository";

export class InMemoryDevolutionItemRepository
  implements DevolutionItemRepository
{
  public items: DevolutionItem[] = [];

  async create(devolutionItem: DevolutionItem) {
    this.items.push(devolutionItem);
  }
}
