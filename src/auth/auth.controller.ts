import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/utils/decorators/user.decorator';
import { AuthService } from './auth.service';
import { JwtUser, LoginDto, TokenDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
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
    return user;
  }
}
