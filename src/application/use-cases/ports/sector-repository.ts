import { Sector } from "@/application/entities/sector";

export interface SectorRepository {
  findById(id: string): Promise<Sector | null>;
  findByName(name: string): Promise<Sector | null>;
  create(sector: Sector): Promise<void>;
}
