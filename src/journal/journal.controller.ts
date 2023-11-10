import { Body, Controller, Post } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Post()
  createJournal(@Body() dto: CreateJournalDto) {
    return this.journalService.create(dto);
  }
}
