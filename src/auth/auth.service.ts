import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AppMailerService } from 'src/mailer/mailer.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtUser, LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private mailService: AppMailerService,
  ) {}

  async register(registerDto?: CreateUserDto) {
    console.log(registerDto);
    return this.mailService.sendMail();
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userService.findOneByName(username);

    if (!user) throw new NotFoundException("User doesn't exist");

    const isMatch = await compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid Credentials');

    delete user.password;

    return {
      ...user,
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      }),
    };
  }

  async profile(userId: string) {
    return this.userService.findOne(userId);
  }

  async checkPermission([mod, act]: [string, string], jwtUser: JwtUser) {
    const user = await this.userService.findOne(jwtUser.id);

    const permissions = user?.role?.permissions;

    if (!permissions) return false;

    return Boolean(
      permissions.find(
        ({ module, action }) => module === mod && action === act,
      ),
    );
  }
}
