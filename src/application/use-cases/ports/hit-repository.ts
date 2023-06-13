import { Hit } from "@/application/entities/hit";

export interface HitRepository {
  create(hit: Hit): Promise<void>;
}
