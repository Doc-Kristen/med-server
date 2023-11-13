import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateJournalDto {
  readonly userId: number;

  @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
  @IsString({ message: 'Некорректная дата' })
  readonly datetime: string;

  @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
  @IsInt({ message: 'Должно быть целым числом' })
  @Min(0, { message: 'Должно быть не меньше 0' })
  @Max(500, { message: 'Должно быть не больше 500' })
  readonly systolic: number;

  @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
  @IsInt({ message: 'Должно быть целым числом' })
  @Min(0, { message: 'Должно быть не меньше 0' })
  @Max(500, { message: 'Должно быть не больше 500' })
  readonly diastolic: number;

  @IsInt({ message: 'Должно быть целым числом' })
  @Min(0, { message: 'Должно быть не меньше 0' })
  @Max(500, { message: 'Должно быть не больше 500' })
  readonly heartRate: number;

  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 300, { message: 'Не меньше 3 и не больше 300 символов' })
  @IsOptional()
  readonly medications?: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(3, 300, { message: 'Не меньше 3 и не больше 300 символов' })
  @IsOptional()
  readonly complaints?: string;
}
