import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ActionsModule,
    ModulesModule,
    PermissionsModule,
    RolesModule,
  ],
})
export class AppModule {}
