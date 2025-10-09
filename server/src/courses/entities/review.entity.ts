import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommentSchema } from "./comment.entity";
import { Types } from "mongoose";

export type ReviewDocument = Review & Document;

@Schema({timestamps : true})
export class Review {

    @Prop({ type : Types.ObjectId})
    user: Types.ObjectId

    @Prop()
    rating: number

    @Prop()
    comment: string 

    @Prop({type : [CommentSchema], default: [] })
    commentRep: Comment[]
}

export const ReviewSchema = SchemaFactory.createForClass(Review);