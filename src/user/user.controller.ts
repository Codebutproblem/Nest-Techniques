import { Controller, Get, Inject, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UserDto } from './dto/user.dto';
import { UserCacheInterceptor } from './interceptor/user-cache.interceptor';

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

    
    @UseInterceptors(UserCacheInterceptor)
    @CacheTTL(10000)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        return await this.userService.findOne(id);
    }
}
