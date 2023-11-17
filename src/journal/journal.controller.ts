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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
    @Body() dto: CreateJournalDto,
  ) {
    return this.journalService.update(authorization, +id, dto);
  }
}
