import { CreateJournalDto } from './create-journal.dto';

export class UpdateJournalDto {
  readonly journalId: number;
  readonly newJournal: CreateJournalDto;
}
