import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

/* eslint-disable */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService : DatabaseService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/origin')
  getOrigin(): string {
    return this.appService.getOrigin();
  }

  @Get('/port')
  getPort(): string {
    return this.appService.getPort();
  }

  @Get('/test')
  getTestAPI(): { status: number; message: string } {
    return this.appService.getTestAPI();
  }

  @Get('/db-status')
  getDBStatus(): string {
    return this.databaseService.getConnectionStatus();
  }
}
