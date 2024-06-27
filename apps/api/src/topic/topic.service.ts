import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Topic, Prisma, User } from '@prisma/client';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async topic(
    topicWhereUniqueInput: Prisma.TopicWhereUniqueInput,
  ): Promise<Partial<Topic> | null> {
    const topic = await this.prismaService.topic.findUnique({
      where: topicWhereUniqueInput,
      select: {
        id: true,
        title: true,
        createdAt: true,
        userId: true,
        posts: true,
      },
    });
    if (!topic) {
      throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
    }
    return topic;
  }

  async topics(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TopicWhereUniqueInput;
    where?: Prisma.TopicWhereInput;
    orderBy?: Prisma.TopicOrderByWithRelationInput;
  }): Promise<Partial<Topic>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.topic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        createdAt: true,
        userId: true,
        posts: true,
      },
    });
  }

  async createTopic(data: Prisma.TopicCreateInput): Promise<Topic> {
    return this.prismaService.topic.create({
      data,
    });
  }

  async deleteTopic(
    where: Prisma.TopicWhereUniqueInput,
    user: Partial<User>,
  ): Promise<Topic> {
    const topic = await this.topic(where);
    if (!topic) {
      throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
    }
    if (topic.userId !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.prismaService.topic.delete({
      where,
    });
  }
}
