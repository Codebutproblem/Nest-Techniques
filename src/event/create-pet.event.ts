import { PetDto } from "src/pet/dto/pet.dto";

export class CreatePetEvent {
    constructor(public readonly name: string, public readonly pet : PetDto) {}
}