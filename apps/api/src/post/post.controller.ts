import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':title')
  async post(@Param('title') title: string) {
    return this.postService.post({ title: title });
  }

  @Get()
  async posts() {
    return this.postService.posts({});
  }

  @Post()
  async createPost(
    @Body() data: { title: string; content: string; topicId: string },
    @Request() request,
  ) {
    return this.postService.createPost(
      {
        title: data.title,
        content: data.content,
        user: { connect: { id: request.user.id } },
        topic: { connect: { id: data.topicId } },
      },
      request.user,
      data.topicId,
    );
  }

  @Delete(':title')
  async deletePost(@Param('title') title: string, @Request() request) {
    return this.postService.deletePost({ title: title }, request.user);
  }
}
