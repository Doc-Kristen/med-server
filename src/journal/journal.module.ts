import { Module } from '@nestjs/common';
import { JournalService as JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Journal } from './journal.model';

@Module({
  providers: [JournalService],
  controllers: [JournalController],
  imports: [SequelizeModule.forFeature([User, Journal])],
})
export class JournalModule {}
