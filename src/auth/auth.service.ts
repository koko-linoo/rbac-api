import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtUser, LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly service: UsersService,
    private jwt: JwtService,
  ) {}

  async login({ username, password }: LoginDto) {
    const user = await this.service.findOneByName(username);

    if (!user) throw new UnauthorizedException("User doesn't exist");

    const isMatch = await compare(password, user.password);

    if (!isMatch)
      throw new UnauthorizedException('Invalid Credentials. Please try again');

    delete user.password;

    return {
      ...user,
      accessToken: await this.jwt.signAsync({
        id: user.id,
        username: user.username,
      }),
    };
  }

  async profile(userId: string) {
    return this.service.findOne(userId);
  }

  async checkPermission(permission: [string, string], jwtUser: JwtUser) {
    const user = await this.service.findOne(jwtUser.id);

    if (!user) return false;

    const role = user.role;

    if (!role) return false;

    const permissions = role.permissions;

    if (!permissions) return false;

    const permissionExists = permissions.find(
      ({ module, action }) =>
        module === permission[0] && action === permission[1],
    );

    if (!permissionExists) return false;

    return true;
  }
}
