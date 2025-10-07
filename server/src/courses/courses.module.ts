import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { Link, LinkSchema } from './entities/link.entity';
import { CourseData, CourseDataSchema } from './entities/course-data.entity';
import { Comment, CommentSchema } from './entities/comment.entity';
import { CoursesRepository } from './repository/course.repository';
import { Course, CourseSchema } from './entities/course.entity';
import { UserRepository } from 'src/users/repository/users.repository';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, UserRepository],
  imports : [MongooseModule.forFeature([
    {name : Review.name,schema: ReviewSchema },
    {name : Link.name , schema: LinkSchema},
    {name : CourseData.name, schema: CourseDataSchema},
    {name : Comment.name, schema: CommentSchema},
    {name : Course.name, schema: CourseSchema},
    {name : User.name, schema: UserSchema}
  ])],
  exports : [CoursesService]
})
export class CoursesModule {}
