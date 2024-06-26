import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.user({ email: email }, true, true);

    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.FORBIDDEN,
      );
    } else {
      if (await bcrypt.compare(password, user.password)) {
        return await user;
      } else {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }

  // TODO: Implement the signup method with the following code bcrypt.hash(password, 10);

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async getProfile(): Promise<Partial<User> | null> {
    return null;
  }
}
