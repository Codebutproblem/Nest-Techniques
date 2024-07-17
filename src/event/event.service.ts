import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PetDto } from 'src/pet/dto/pet.dto';

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name);
    @OnEvent('pet.created')
    createPetEvent(pet : PetDto){
        this.logger.log(`Pet ${pet.name} created`);
    }

}
