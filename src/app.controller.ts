import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('healthcheck')
  getHello(): { status: string; ts: string } {
    return {
      status: 'ok',
      ts: new Date().toISOString(),
    };
  }
}
