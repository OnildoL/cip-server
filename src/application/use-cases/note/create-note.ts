import { Either, left, right } from "@/application/entities/either";
import { Note } from "@/application/entities/note";
import { NoteRepository } from "../ports/note-repository";
import { ExistingNoteError } from "../errors/existing-note-error";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";

interface CreateNoteUseCaseRequest {
  company_id: UniqueEntityID;
  bond_id?: UniqueEntityID | null;
  provider_id: UniqueEntityID;
  access_key: string;
  amount_in_cent: number;
  nf: number;
  issue: Date;
  receive?: "RECEBER" | "PENDENTE" | "RECUSAR" | null;
  hangtag?: string | null;
  arrival?: Date | null;
  input?: Date | null;
  comment?: string | null;
}

type CreateNoteUseCaseResponse = Either<ExistingNoteError, Note>;

export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({
    company_id,
    bond_id = null,
    provider_id,
    access_key,
    amount_in_cent,
    nf,
    issue,
    receive = null,
    hangtag = null,
    arrival = null,
    input = null,
    comment = null,
  }: CreateNoteUseCaseRequest): Promise<CreateNoteUseCaseResponse> {
    const noteRegistered = await this.noteRepository.findByAccesskey(
      access_key
    );

    if (noteRegistered) {
      return left(new ExistingNoteError());
    }

    const note = Note.create({
      company_id,
      bond_id,
      provider_id,
      access_key,
      amount_in_cent: amount_in_cent * 100,
      nf,
      issue,
      receive,
      hangtag,
      arrival,
      input,
      comment,
    });

    await this.noteRepository.create(note);

    return right(note);
  }
}
