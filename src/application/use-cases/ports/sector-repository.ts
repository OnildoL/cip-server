import { Sector } from "@/application/entities/sector";

export interface SectorRepository {
  findByName(name: string): Promise<Sector | null>;
  create(sector: Sector): Promise<void>;
}
