import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtUser, LoginDto } from './dto/login.dto';

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

  async checkPermission(permission: [string, string], jwtUser: JwtUser) {
    const user = await this.usersService.findOne(jwtUser.id);
    console.log({ user });

    if (!user) return false;

    const role = user.role;
    console.log({ role });

    if (!role) return false;

    const permissions = role.permissions;
    console.log({ permissions });

    if (!permissions) return false;

    const permissionExists = permissions.find(
      ({ module, action }) =>
        module === permission[0] && action === permission[1],
    );

    if (!permissionExists) return false;

    return true;
  }
}
