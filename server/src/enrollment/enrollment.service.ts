import { BadRequestException, Injectable } from '@nestjs/common';
import { EnrollmentRepository } from './repository/enrollment.repository';
import { CoursesRepository } from 'src/courses/repository/course.repository';
import { Types } from 'mongoose';

@Injectable()
export class EnrollmentService {
    constructor(private readonly enrollmentRepo : EnrollmentRepository,
                private readonly courseRepo : CoursesRepository
    ){}

    async enroll(studentId : string, courseId : string) {
        const existingEnrollment = await this.enrollmentRepo.findStudentInCourse(studentId, courseId);

        if(existingEnrollment) {
            throw new BadRequestException('Already Enrolled');
        }

        return await this.enrollmentRepo.save({
            user: new Types.ObjectId(studentId),
            course: new Types.ObjectId(courseId)
        });
    }

    async findAllEnrolledCourses(userId : string) {
        return await this.enrollmentRepo.findAllEnrolledCourses(userId);
    }

}
