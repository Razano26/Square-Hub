import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Request,
  Delete,
} from '@nestjs/common';
import { Topic } from '@prisma/client';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getAllTopics(): Promise<Partial<Topic>[]> {
    return this.topicService.topics({});
  }

  @Get(':title')
  async getTopicBytitle(
    @Param('title') title: string,
  ): Promise<Partial<Topic>> {
    return this.topicService.topic({ title: title });
  }

  @Post()
  async createTopic(
    @Body() data: { title: string },
    @Request() request,
  ): Promise<Topic> {
    const topic = {
      title: data.title,
      user: { connect: { id: request.user.id } },
    };
    return this.topicService.createTopic(topic);
  }

  @Delete(':title')
  async deleteTopic(
    @Param('title') title: string,
    @Request() request,
  ): Promise<Topic> {
    return this.topicService.deleteTopic({ title: title }, request.user);
  }
}
