import { Hit } from "@/application/entities/hit";

export interface HitRepository {
  findById(id: string): Promise<Hit | null>;
  create(hit: Hit): Promise<void>;
  save(hit: Hit): Promise<void>;
  delete(hit: Hit): Promise<void>;
}
