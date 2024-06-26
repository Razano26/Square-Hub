import { Controller, Get, Param } from '@nestjs/common';
import { Topic } from '@prisma/client';
import { Public } from 'src/auth/auth.decorator';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Public()
  @Get()
  async getAllTopics(): Promise<Partial<Topic>[]> {
    return this.topicService.topics({});
  }

  @Public()
  @Get(':name')
  async getTopicByName(@Param('name') name: string): Promise<Partial<Topic>> {
    return this.topicService.topic({ title: name });
  }

  // @Public()
  // @Post()
  // async createTopic(@Body() data: { title: string }): Promise<Topic> {
  //   return this.topicService.createTopic(data);
  // }
}
