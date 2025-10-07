import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Review, ReviewSchema } from "./review.entity";
import { CourseData } from "./course-data.entity";
import { Types } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type CourseSchema = Course & Document;

@Schema({timestamps : true, collection: 'courses'})
export class Course {

    @Prop()
    name: string

    @Prop()
    desc: string

    @Prop()
    price: number

    @Prop()
    ratings: number;

    @Prop({ type : [ReviewSchema], default: []})
    reviews: Review[]

    tags? : string

    demoUrl: string

    prerequisities: {title: string}[]

    @Prop({type : [CourseData], default: []})
    courseData: CourseData[]

    @Prop({type : Types.ObjectId , ref : 'User', required : true})
    instructor : User | Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);