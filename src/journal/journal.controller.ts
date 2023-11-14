import {
  Body,
  Controller,
  Delete,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JournalService } from './journal.service';
import { DeleteJournalDto } from './dto/delete-journal.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('journal')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createJournal(@Body() dto: CreateJournalDto) {
    return this.journalService.create(dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(
    @Headers('authorization') authorization: string,
    @Body() dto: DeleteJournalDto,
  ) {
    return this.journalService.delete(authorization, dto.journalId);
  }
}
