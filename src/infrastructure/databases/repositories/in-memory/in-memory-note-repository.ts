import { Note } from "@/application/entities/note";
import { NoteRepository } from "@/application/use-cases/ports/note-repository";

export class InMemoryNoteRepository implements NoteRepository {
  public items: Note[] = [];

  async findByAccesskey(access_key: string) {
    const note = this.items.find((item) => item.access_key === access_key);

    if (!note) {
      return null;
    }

    return note;
  }

  async create(note: Note) {
    this.items.push(note);
  }
}
