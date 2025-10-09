import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentController } from './courses/repository/enrollment/enrollment.controller';
import { EnrollmentModule } from './courses/repository/enrollment/enrollment.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, CoursesModule, EnrollmentModule, 
    RedisModule
  ],
  controllers: [AppController, EnrollmentController],
  providers: [AppService],
})
export class AppModule {}
