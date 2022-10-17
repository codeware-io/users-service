import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(): { success: boolean; message: string } {
    return { success: true, message: 'Server is running successfully!' };
  }
}
