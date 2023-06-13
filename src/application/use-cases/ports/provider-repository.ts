import { Provider } from "@/application/entities/provider";

export interface ProviderRepository {
  findByCnpj(cnpj: string): Promise<Provider | null>;
  create(provider: Provider): Promise<void>;
}
