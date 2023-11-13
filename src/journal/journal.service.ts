import { Injectable } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journal.model';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal) private journalRepository: typeof Journal,
  ) {}
  async create(dto: CreateJournalDto) {
    const journal = await this.journalRepository.create(dto);
    return journal;
  }
}
