import { Body, Controller, Post } from '@nestjs/common';
import { PetDto } from './dto/pet.dto';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {

    constructor(private readonly petService: PetService) {}

    @Post()
    create(@Body() pet: PetDto) {
        return this.petService.create(pet);
    }
}
