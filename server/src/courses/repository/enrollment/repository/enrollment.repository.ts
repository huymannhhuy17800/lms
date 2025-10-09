import { BaseRepository } from "src/common/base/base.repository";
import { Enrollment } from "../entities/enrollment.entity";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export class EnrollmentRepository extends BaseRepository<Enrollment> {
    constructor(@InjectModel(Enrollment.name) private enrollmentModel : Model<Enrollment>){
        super(enrollmentModel)
    }
    
    async findStudentInCourse(studentId: string , courseId: string): Promise<Enrollment | null> {
        return this.enrollmentModel.findOne({ user: new Types.ObjectId(studentId), course: new Types.ObjectId(courseId) })
    }
    
    async findAllEnrolledCourses(userId : string) {
        return this.enrollmentModel.find({
            user : new Types.ObjectId(userId)
        }).populate('course')
        .exec();
    }
}