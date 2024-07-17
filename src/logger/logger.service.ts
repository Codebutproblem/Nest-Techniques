import { ConsoleLogger, Injectable, Logger, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {

    private readonly logger = new Logger(LoggerService.name);

    doSomething() {
        this.logger.log('Doing something...');
    }

    log(message: any, context?: string, ...args: any[]) {
        // add your tailored logic here
        super.log(message, context);
    }
    error(message: any, stack?: string, context?: string, ...args: any[]) {
        // add your tailored logic here
        super.error(message, stack, context);
    }

    warn(message: any, context?: string, ...args: any[]) {
        // add your tailored logic here
        super.warn(message, context);
    }
}