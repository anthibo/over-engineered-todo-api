import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  pong(): string {
    return 'pong';
  }
}
