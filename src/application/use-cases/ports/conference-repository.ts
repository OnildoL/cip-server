import { Conference } from "@/application/entities/conference";

export interface ConferenceRepository {
  create(conference: Conference): Promise<void>;
}
