import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';
import { AuthResponse } from './models/auth-response.model';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Войти в кабинет' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Получение статуса авторизации' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @Get('/login')
  checkAuth(@Headers('authorization') token: string): Promise<AuthResponse> {
    return this.authService.checkAuth(token);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
