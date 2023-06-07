import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface SectorProps {
  name: string;
}

export class Sector extends Entity<SectorProps> {
  static create(props: SectorProps, id?: UniqueEntityID) {
    const sector = new Sector(props, id);

    return sector;
  }

  get name() {
    return this.props.name;
  }
}
