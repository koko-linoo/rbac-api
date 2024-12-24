import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { JwtUser, LoginDto, TokenDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    status: 200,
    description: 'Login successful',
    type: TokenDto,
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'Profile successful',
    type: JwtUser,
  })
  @Get('profile')
  profile(@User() user: JwtUser) {
    return this.authService.profile(user.id);
  }
}
