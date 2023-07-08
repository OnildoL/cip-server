import { Devolution, DevolutionProps } from "@/application/entities/devolution";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

export function makeDevolution(
  override?: Partial<DevolutionProps>,
  id?: UniqueEntityID
) {
  const devolution = Devolution.create(
    {
      company_id: new UniqueEntityID("1"),
      status: "OK",
      date: new Date(),
      last_devolution_date: new Date(),
      current_devolution_date: new Date(),
      last_devolution_tp: "P",
      current_devolution_tp: "T",
      balance_in_cent: 0,
      consignation_total_value_in_cent: 0,
      total_devolution_in_cent: 0,
      new_consignment_value_in_cent: 0,
      new_consignment_date: new Date(),
      filled: new Date(),
      ...override,
    },
    id
  );

  return devolution;
}
