import { Note } from "@/application/entities/note";

export interface NoteRepository {
  findByAccesskey(access_key: string): Promise<Note | null>;
  create(note: Note): Promise<void>;
}
