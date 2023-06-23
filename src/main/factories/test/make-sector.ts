import { Sector, SectorProps } from "@/application/entities/sector";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export function makeSector(
  override?: Partial<SectorProps>,
  id?: UniqueEntityID
) {
  const sector = Sector.create(
    {
      name: "LIVRARIA",
      ...override,
    },
    id
  );

  return sector;
}
