import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/logger/logger.service';
import { PetDto } from 'src/pet/dto/pet.dto';

@Injectable()
export class EventService {

    constructor(private readonly loggerService: LoggerService) {
        loggerService.setContext(EventService.name);
    }

    @OnEvent('pet.created')
    createPetEvent(pet : PetDto){
        this.loggerService.log(`Pet ${pet.name} created`);
    }

}
