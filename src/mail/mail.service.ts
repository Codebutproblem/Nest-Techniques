import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue('mail-queue') private readonly mailQueue: Queue,
        private readonly userService: UserService
    ) {}

    async sendMail(id: number) : Promise<void> {
        const user = await this.userService.findOne(id);
        const job = await this.mailQueue.add('sendMail', {
            email: user.email,
            subject: `Hello ${user.username}`,
            message: `Hi ${user.username} Forgot your password? If you didn't forget your password, please ignore this email!`
        });
    }
}
