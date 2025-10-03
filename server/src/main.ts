/* eslint-disable */
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { HttpExceptionFilter } from './global-filters/http-exception.filters';
import { AllExceptionsFilter } from './global-filters/all-exceptions.filters';
import { ValidationPipe } from '@nestjs/common';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe());
    // cross origin resource sharing
  app.use(cors({ origin: process.env.ORIGIN }));
  //cookie parser
  app.use(cookieParser());

  // app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter(httpAdapterHost));
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
