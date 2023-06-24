import { Provider, ProviderProps } from "@/application/entities/provider";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export function makeProvider(
  override?: Partial<ProviderProps>,
  id?: UniqueEntityID
) {
  const provider = Provider.create(
    {
      cnpj: "06.985.027/0005-90",
      name: "Editora Arqueiro Ltda",
      system_number: 10522,
      ...override,
    },
    id
  );

  return provider;
}
