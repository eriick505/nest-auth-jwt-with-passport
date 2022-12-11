import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const throwException = () => {
      throw new UnauthorizedException(
        'Email address or password provided is incorrect.',
      );
    };

    if (!user) throwException();

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) throwException();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
