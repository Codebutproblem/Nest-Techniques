import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}


    @Get(':id')
    async sendMail(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        await this.mailService.sendMail(id);
        return {
            message: 'Mail sent successfully'
        };
    }
}
