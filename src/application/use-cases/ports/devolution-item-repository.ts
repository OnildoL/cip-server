import { DevolutionItem } from "@/application/entities/devolution-item";

export interface DevolutionItemRepository {
  create(devolutionItem: DevolutionItem): Promise<void>;
}
