import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
// import { RedisModule } from './redis/redis.module';
import { EnrollmentController } from './enrollment/enrollment.controller';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, CoursesModule, EnrollmentModule],
  controllers: [AppController, EnrollmentController],
  providers: [AppService],
})
export class AppModule {}
