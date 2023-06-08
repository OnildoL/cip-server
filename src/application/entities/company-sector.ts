import { Entity } from "./entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface CompanySectorProps {
  company_id: UniqueEntityID;
  sector_id: UniqueEntityID;
  type: "MAIN" | "SUB";
  main_sector?: UniqueEntityID | null;
}

export class CompanySector extends Entity<CompanySectorProps> {
  static create(props: CompanySectorProps, id?: UniqueEntityID) {
    const companySector = new CompanySector(props, id);

    return companySector;
  }

  get company_id() {
    return this.props.company_id;
  }

  get sector_id() {
    return this.props.sector_id;
  }

  get type() {
    return this.props.type;
  }

  get main_sector() {
    return this.props.main_sector;
  }

  set type(type: "MAIN" | "SUB") {
    this.props.type = type;
  }

  set main_sector(main_sector) {
    this.props.main_sector = main_sector;
  }
}
