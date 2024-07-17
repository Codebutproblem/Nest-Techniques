import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UserDto } from './dto/user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    filePath = 'src/user/users.json';
    constructor( @Inject(CACHE_MANAGER) private cacheManager: Cache ) {}

    async findAll(): Promise<UserDto[]> {
        // Giả sử đang lấy data từ csdl mất 1.5s
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = fs.readFileSync(this.filePath, 'utf8');
                const users = JSON.parse(data);
                resolve(users);
            }, 1500);
        });
    }

    async findOne(id: number): Promise<UserDto> {
        const data = fs.readFileSync(this.filePath, 'utf8');
        const users = JSON.parse(data);
        const user = users.find((user: UserDto) => user.id === id);
        return plainToInstance(UserDto, user);
    }
}
