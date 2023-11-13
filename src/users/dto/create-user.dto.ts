import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsNotEmpty({ message: 'Поле "email" обязательно для заполнения' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsNotEmpty({ message: 'Поле "Пароль" обязательно для заполнения' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 20, { message: 'Не меньше 8 и не больше 20' })
  readonly password: string;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(0, 50, { message: 'Не больше 50 символов' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(0, 50, { message: 'Не больше 50 символов' })
  lastName?: string;

  @ApiProperty({ example: '1990-05-15', description: 'Дата рождения' })
  @IsOptional()
  @IsString({ message: 'Некорректная дата рождения' })
  birthday?: string;
}
