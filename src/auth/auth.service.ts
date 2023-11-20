import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { AuthResponse } from './models/auth-response.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
  ) {}
  async login(
    userDto: CreateUserDto,
  ): Promise<{ userId: number; accessToken: string }> {
    const user = await this.validateUser(userDto);
    const accessToken = await this.generateToken(user);
    return { userId: user.id, accessToken: accessToken.accessToken };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(userDto.password, saltRounds);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
  private async generateToken(user: User) {
    const payLoad = { email: user.email, id: user.id, roles: user.roles };
    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payLoad),
    };
  }

  async checkAuth(token: string): Promise<AuthResponse> {
    try {
      const userToken = token.split(' ')[1];
      const decodedToken = await this.jwtService.decode(userToken);
      const isAuth = decodedToken !== null;
      return { isAuthenticated: isAuth };
    } catch (error) {
      throw new UnauthorizedException('Недействительный токен');
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passswordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
  }

  async extractUserIdFromToken(token: string): Promise<number> {
    try {
      const userToken = token.split(' ')[1];
      const decodedToken = await this.jwtService.decode(userToken);
      return decodedToken.id;
    } catch (error) {
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
