import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenStrategy } from 'src/passport-strategy/access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
  imports : [UsersModule, JwtModule.register({})]
})
export class AuthModule {}
