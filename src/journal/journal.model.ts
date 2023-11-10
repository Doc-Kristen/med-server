import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
interface JournalCreationAttrs {
  datetime: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  medications?: string;
  complaints?: string;
  userId: number;
}

@Table({ tableName: 'journal' })
export class Journal extends Model<Journal, JournalCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: '"2023-11-10T12:30:00"',
    description: 'Время создания записи',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  datetime: string;
  @ApiProperty({ example: '120', description: 'Систолическое давление' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  systolic: number;

  @ApiProperty({ example: '80', description: 'Диастолическое давление' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  diastolic: number;

  @ApiProperty({ example: '67', description: 'Частота сердечных сокращений' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  heartRate: number;

  @ApiProperty({ example: 'Амлодипин', description: 'Принятые лекарства' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  medications: string;

  @ApiProperty({ example: 'Головная боль', description: 'Жалобы' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  complaints: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
