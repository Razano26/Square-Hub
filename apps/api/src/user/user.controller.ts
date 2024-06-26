import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async signupUser(
    @Body() userData: { name?: string; email: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Public()
  @Get()
  async getAllUsers(): Promise<Partial<User>[]> {
    return this.userService.users({});
  }

  @Public()
  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<Partial<User>> {
    return this.userService.user({ email: email });
  }
}
