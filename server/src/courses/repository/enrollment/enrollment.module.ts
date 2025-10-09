import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Enrollment, EnrollmentSchema } from './entities/enrollment.entity';
import { EnrollmentRepository } from './repository/enrollment.repository';
import { CoursesRepository } from 'src/courses/repository/course.repository';
import { Course, CourseSchema } from 'src/courses/entities/course.entity';

@Module({
  providers: [EnrollmentService, EnrollmentRepository, CoursesRepository],
  imports: [MongooseModule.forFeature([
    { name: Enrollment.name , schema: EnrollmentSchema},
    { name: Course.name, schema: CourseSchema}
  ])],
  exports: [EnrollmentService]
})
export class EnrollmentModule {}
