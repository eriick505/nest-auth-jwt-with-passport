import { Module } from '@nestjs/common';

import { LocalStrategy } from './strategies/local.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
