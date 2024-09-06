import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ActionsModule } from './actions/actions.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ActionsModule, ModulesModule],
})
export class AppModule {}
