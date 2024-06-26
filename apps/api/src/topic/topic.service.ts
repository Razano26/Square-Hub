import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Topic, Prisma } from '@prisma/client';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async topic(
    topicWhereUniqueInput: Prisma.TopicWhereUniqueInput,
  ): Promise<Partial<Topic> | null> {
    return this.prismaService.topic.findUnique({
      where: topicWhereUniqueInput,
      select: {
        id: true,
        title: true,
        createdAt: true,
        posts: true,
      },
    });
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
        title: true,
      },
    });
  }

  async createTopic(data: Prisma.TopicCreateInput): Promise<Topic> {
    return this.prismaService.topic.create({
      data,
    });
  }

  async updateTopic(params: {
    where: Prisma.TopicWhereUniqueInput;
    data: Prisma.TopicUpdateInput;
  }): Promise<Topic> {
    const { where, data } = params;
    return this.prismaService.topic.update({
      data,
      where,
    });
  }

  async deleteTopic(where: Prisma.TopicWhereUniqueInput): Promise<Topic> {
    return this.prismaService.topic.delete({
      where,
    });
  }
}
