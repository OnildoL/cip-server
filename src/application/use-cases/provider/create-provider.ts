import { Either, left, right } from "@/application/entities/either";
import { Provider } from "@/application/entities/provider";
import { ProviderRepository } from "../ports/provider-repository";
import { ExistingProviderError } from "../errors/existing-provider-error";

interface CreateProviderUseCaseRequest {
  name: string;
  cnpj: string;
  system_number: number;
}

type CreateProviderUseCaseResponse = Either<ExistingProviderError, Provider>;

export class CreateProviderUseCase {
  constructor(private providerRepository: ProviderRepository) {}

  async execute({
    name,
    cnpj,
    system_number,
  }: CreateProviderUseCaseRequest): Promise<CreateProviderUseCaseResponse> {
    const providerRegistered = await this.providerRepository.findByCnpj(cnpj);

    if (providerRegistered) {
      return left(new ExistingProviderError());
    }

    const provider = Provider.create({
      name,
      cnpj,
      system_number,
    });

    await this.providerRepository.create(provider);

    return right(provider);
  }
}
