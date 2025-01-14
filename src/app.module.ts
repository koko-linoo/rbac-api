import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { NotificationModule } from './notifications/notification.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ActionsModule,
    ModulesModule,
    PermissionsModule,
    RolesModule,
    NotificationModule,
    ChatRoomsModule,
  ],
})
export class AppModule {}
