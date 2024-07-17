import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCacheInterceptor } from './interceptor/user-cache.interceptor';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserCacheInterceptor],
  exports: [UserService]
})
export class UserModule { }
