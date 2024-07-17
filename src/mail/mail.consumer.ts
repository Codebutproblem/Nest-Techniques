import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Job } from "bullmq";
@Processor('mail-queue')
export class MailConsumer extends WorkerHost {
    private logger = new Logger(MailConsumer.name);
    constructor(
        private readonly mailService: MailerService,
        private readonly configService: ConfigService,
    ) {
        super();
    }

    async process(job: Job<any, any, string>) {
        try {
            this.mailService.sendMail({
                from: this.configService.get<string>('EMAIL_USERNAME'),
                to: job.data.email,
                subject: job.data.subject,
                text: job.data.message,
            });
            this.logger.log(`Mail sent to ${job.data.email}`);
        } catch (error) {
            this.logger.error(`Error sending mail to ${job.data.email}`, error.stack);
        }

        return {};
    }

    @OnQueueEvent('completed')
    onActive(job: Job) {
        console.log(`Job completed with result: ${job.returnvalue}`);
    }
}