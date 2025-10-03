import { Injectable } from '@nestjs/common';
import { type Request } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getOrigin(): string {
    return process.env.ORIGIN || 'cannot find origin';
  }
  getPort(): string {
    return process.env.PORT || 'cannot find port';
  }

  getTestAPI(): { status: number; message: string } {
    return { status: 200, message: 'Test API is working' };
  }
}
