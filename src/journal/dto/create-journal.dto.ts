export class CreateJournalDto {
  readonly userId: number;
  readonly datetime: string;
  readonly systolic: number;
  readonly diastolic: number;
  readonly heartRate: number;
  readonly medications?: string;
  readonly complaints?: string;
}
