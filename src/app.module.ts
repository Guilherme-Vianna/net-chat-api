import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './services/chat/chat.module';
import { MessageModule } from './services/message/message.module';
import { UserModule } from './services/user/user.module';
import { EmailService } from './services/email/email.service';

@Module({
  imports: [ChatModule, PrismaModule, AuthModule, UserModule, MessageModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
