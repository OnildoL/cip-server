import { Hit, HitProps } from "@/application/entities/hit";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export function makeHit(override?: Partial<HitProps>, id?: UniqueEntityID) {
  const hit = Hit.create(
    {
      provider_id: new UniqueEntityID("1"),
      company_id: new UniqueEntityID("1"),
      last_hit: null,
      current_hit: null,
      total_sale_in_cent: 0,
      total_system_in_cent: 0,
      reason: null,
      situation: null,
      date: new Date(),
      comment: null,
      ...override,
    },
    id
  );

  return hit;
}
