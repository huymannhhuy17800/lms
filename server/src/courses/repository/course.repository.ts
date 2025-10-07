import { BaseRepository } from "src/common/base/base.repository";
import { Course } from "../entities/course.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { IGNORED_ATTRIBUTES } from "src/utils/constant.util";

@Injectable()
export class CoursesRepository extends BaseRepository<Course> {
    constructor(@InjectModel(Course.name) private courseModel : Model<Course>){
        super(courseModel);
    }

    async findByIdAndUpdate(id : string, data: any){
        return await this.courseModel.findByIdAndUpdate({_id : id}, {$set: data}, {new : true});
    }

    async getSingleCourse(id : string) {
        return await this.courseModel.findById({_id : id, active : true}).select(IGNORED_ATTRIBUTES);
    }

    async getAllCourse() {
        return await this.courseModel.find().select(IGNORED_ATTRIBUTES);
    }

    async getAllCoursesByInstructor(id: string) {
        return await this.courseModel.find({instructor : id});
    }


}