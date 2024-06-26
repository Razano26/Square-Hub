import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  health(): string {
    const version = this.configService.get('APP_VERSION') || '0.0.1';
    return JSON.stringify({ version });
  }
}
