import { Conference } from "@/application/entities/conference";
import { ConferenceRepository } from "@/application/use-cases/ports/conference-repository";

export class InMemoryConferenceRepository implements ConferenceRepository {
  public items: Conference[] = [];

  async create(conference: Conference) {
    this.items.push(conference);
  }
}
