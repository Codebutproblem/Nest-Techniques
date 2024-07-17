import { Injectable } from '@nestjs/common';
import { PetDto } from './dto/pet.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePetEvent } from 'src/event/create-pet.event';

@Injectable()
export class PetService {

    constructor(private eventEmitter: EventEmitter2){}

    private pets : PetDto[] = [];

    create(pet: PetDto) : PetDto[] {
        this.pets.push(pet);
        this.eventEmitter.emit('pet.created', new CreatePetEvent(pet.name, pet));
        return this.pets;
    }
}
