import { Module } from '@nestjs/common';
import { JournalService as JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Journal } from './journal.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [JournalService],
  controllers: [JournalController],
  imports: [SequelizeModule.forFeature([User, Journal]), AuthModule],
})
export class JournalModule {}
