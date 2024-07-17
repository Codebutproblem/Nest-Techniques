import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bullmq';
import { UserModule } from 'src/user/user.module';
import { MailConsumer } from './mail.consumer';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          auth: {
            user: configService.get<string>('EMAIL_USERNAME'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers: [MailController],
  providers: [MailService, MailConsumer]
})
export class MailModule { }
