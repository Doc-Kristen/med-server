import {
  Body,
  Controller,
  Delete,
  Post,
  UseGuards,
  Headers,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JournalService } from './journal.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateJournalDto } from './dto/update-journal.dto';

@Controller('journal')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createJournal(
    @Headers('authorization') authorization: string,
    @Body() dto: CreateJournalDto,
  ) {
    return this.journalService.create(authorization, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    return this.journalService.delete(authorization, +id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(
    @Headers('authorization') authorization: string,
    @Body() dto: UpdateJournalDto,
  ) {
    return this.journalService.update(
      authorization,
      dto.journalId,
      dto.newJournal,
    );
  }
}
