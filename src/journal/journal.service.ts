import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journal.model';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal) private journalRepository: typeof Journal,
    private authService: AuthService,
  ) {}
  async create(token: string, dto: CreateJournalDto) {
    const userId = await this.authService.extractUserIdFromToken(token);
    const journal = await this.journalRepository.create({ ...dto, userId });
    return journal;
  }

  async delete(token: string, journalId: number) {
    const userId = await this.authService.extractUserIdFromToken(token);
    const journal = await this.journalRepository.findOne({
      where: {
        id: journalId,
        userId: userId,
      },
    });

    if (!userId) {
      throw new NotFoundException('Недействительный токен');
    }

    if (!journal) {
      throw new NotFoundException(
        `Запись с идентификатором ${journalId} не найдена`,
      );
    }

    await journal.destroy();
    return { message: `Запись успешно удалена` };
  }

  async update(token: string, journalId: number, updateDto: CreateJournalDto) {
    const userId = await this.authService.extractUserIdFromToken(token);

    if (!userId) {
      throw new NotFoundException('Недействительный токен');
    }

    const journal = await this.journalRepository.findOne({
      where: {
        id: journalId,
        userId: userId,
      },
    });

    if (!journal) {
      throw new NotFoundException(
        `Запись с идентификатором ${journalId} не найдена`,
      );
    }

    await journal.update(updateDto);

    return journal;
  }
}
