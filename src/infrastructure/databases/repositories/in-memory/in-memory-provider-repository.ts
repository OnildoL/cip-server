import { Provider } from "@/application/entities/provider";
import { ProviderRepository } from "@/application/use-cases/ports/provider-repository";

export class InMemoryProviderRepository implements ProviderRepository {
  public items: Provider[] = [];

  async findByCnpj(cnpj: string) {
    const provider = this.items.find((item) => item.cnpj === cnpj);

    if (!provider) {
      return null;
    }

    return provider;
  }

  async create(provider: Provider) {
    this.items.push(provider);
  }
}
