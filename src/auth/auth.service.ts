import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
