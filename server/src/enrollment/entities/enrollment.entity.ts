import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type EnrollmentSchema = Enrollment & Document;

@Schema({ timestamps : true , collection: "enrollments"})
export class Enrollment {
    
    @Prop({type : Types.ObjectId, ref : 'User'})
    user: Types.ObjectId;

    @Prop({type : Types.ObjectId, ref : 'Course'})
    course: Types.ObjectId;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);