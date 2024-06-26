import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    skipValidation: boolean = false,
    password: boolean = false,
  ): Promise<Partial<User> | null> {
    const user = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        email: true,
        name: true,
        password: password,
        createdAt: true,
        topics: true,
        posts: true,
      },
    });
    if (!user && !skipValidation) {
      console.log('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Partial<User>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        name: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
