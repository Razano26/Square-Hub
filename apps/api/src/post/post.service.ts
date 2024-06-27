import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma, User } from '@prisma/client';
import { TopicService } from 'src/topic/topic.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly topicService: TopicService,
  ) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Partial<Post> | null> {
    const post = await this.prismaService.post.findUnique({
      where: postWhereUniqueInput,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        topicId: true,
        userId: true,
      },
    });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Partial<Post>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        title: true,
        content: true,
        createdAt: true,
        topicId: true,
        userId: true,
      },
    });
  }

  async createPost(
    data: Prisma.PostCreateInput,
    user: Partial<User>,
    topicId: string,
  ): Promise<Partial<Post>> {
    // Check if the topic exists
    const topic = await this.topicService.topic({ id: topicId });

    if (!topic) {
      throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
    }

    data = {
      ...data,
      title: data.title,
      content: data.content,
    };

    return this.prismaService.post.create({
      data,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        topicId: true,
        userId: true,
      },
    });
  }

  async deletePost(
    where: Prisma.PostWhereUniqueInput,
    user: Partial<User>,
  ): Promise<Post> {
    // Check if the post exists
    const post = await this.post(where);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    // Check if the user is the owner of the post
    if (post.userId !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.prismaService.post.delete({
      where,
    });
  }
}
