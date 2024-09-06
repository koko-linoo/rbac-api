import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto) {
    const user = await this.usersService.findOneByName(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      }),
    };
  }

  async profile(userId: string) {
    const user = await this.usersService.findOne(userId);
    return user;
  }
}
