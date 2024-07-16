import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UserDto } from './dto/user.dto';

@Controller('user')
@CacheTTL(8000)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @CacheKey('users')
    @CacheTTL(10000)
    async findAll() : Promise<UserDto[]> {
        return await this.userService.findAll();
    }
}
