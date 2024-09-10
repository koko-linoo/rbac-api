import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Permission } from '../decorators/permission.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if (!canActivate) return false;

    const request = context.switchToHttp().getRequest();

    const permissions = this.reflector.get<[string, string]>(
      Permission,
      context.getHandler(),
    );

    if (!permissions) return true;

    const isAuthorized = await this.authService.checkPermission(
      permissions,
      request.user,
    );

    return isAuthorized;
  }
}
