import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);
    constructor(private schedulerRegistry: SchedulerRegistry) {
        this.addInterval('interval1', 5000);
        this.addTimeout('timeout1', 5000);

        this.getIntervals();
    }

    @Cron('* * * * 8 *')
    handleCronOne() {
        this.logger.debug('Hệ thống yêu cầu bảo trì vào tháng 8 hàng năm');
    }

    @Cron(CronExpression.EVERY_12_HOURS)
    handleCronTwo() {
        this.logger.debug('Kiểm tra hệ thống mỗi 12 giờ');
    }

    @Cron('* * 0 * * *', {
        name: 'notifications',
        timeZone: 'Europe/Paris',
    })
    handleCronThree() {
        this.logger.debug('Called at 12am (Paris time)');
    }

    addInterval(name: string, milliseconds: number) {
        const callback = () => {
            this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
        };

        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
    }

    getIntervals() {
        const intervals = this.schedulerRegistry.getIntervals();
        intervals.forEach(key => this.logger.log(`Interval: ${key}`));
    }

    addTimeout(name: string, milliseconds: number) {
        const callback = () => {
            this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
        };

        const timeout = setTimeout(callback, milliseconds);
        this.schedulerRegistry.addTimeout(name, timeout);
    }

    getTimeouts() {
        const timeouts = this.schedulerRegistry.getTimeouts();
        timeouts.forEach(key => this.logger.log(`Timeout: ${key}`));
    }




}
