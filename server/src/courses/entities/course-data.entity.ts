import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Link, LinkSchema } from "./link.entity";
import { CommentSchema } from "./comment.entity";

export type CourseDataDocument = CourseData & Document;

@Schema({timestamps : true})
export class CourseData {
    @Prop()
    title : string
    
    @Prop()
    desc: string

    @Prop()
    videoUrl: string

    @Prop()
    videoThumbnail: string

    @Prop()
    videoSection: string

    @Prop()
    videoLength: number

    @Prop()
    videoPlayer: string

    @Prop({type : [LinkSchema], default: []})
    links: Link[]

    @Prop()
    suggestion: string

    @Prop({type :[CommentSchema], default: []})
    question: Comment[]
}

export const CourseDataSchema = SchemaFactory.createForClass(CourseData);