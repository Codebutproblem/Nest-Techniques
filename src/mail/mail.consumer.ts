import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { ConfigService } from "@nestjs/config";
import { Job } from "bullmq";
import { LoggerService } from "src/logger/logger.service";
@Processor('mail-queue')
export class MailConsumer extends WorkerHost {

    constructor(
        private readonly mailService: MailerService,
        private readonly configService: ConfigService,
        private readonly loggerService: LoggerService
    ) {
        super();
        loggerService.setContext(MailConsumer.name);
    }

    async process(job: Job<any, any, string>) {
        try {
            this.mailService.sendMail({
                from: this.configService.get<string>('EMAIL_USERNAME'),
                to: job.data.email,
                subject: job.data.subject,
                text: job.data.message,
            });
            
        } catch (error) {
            this.loggerService.error(`Error sending mail to ${job.data.email}`, error.stack);
        }

        return {};
    }

    @OnQueueEvent('completed')
    onActive(job: Job) {
        console.log(`Job completed with result: ${job.returnvalue}`);
    }
}