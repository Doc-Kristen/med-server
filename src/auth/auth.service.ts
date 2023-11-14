import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(
    userDto: CreateUserDto,
  ): Promise<{ user: CreateUserDto; accessToken: string }> {
    const user = await this.validateUser(userDto);
    const accessToken = await this.generateToken(user);
    return { user, accessToken: accessToken.token };
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
      token: this.jwtService.sign(payLoad),
    };
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
