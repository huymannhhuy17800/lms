import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommentSchema } from "./comment.entity";

export type ReviewDocument = Review & Document;

@Schema({timestamps : true})
export class Review {

    @Prop({ type : Object})
    user: object

    @Prop()
    rating: number

    @Prop()
    comment: string 

    @Prop({type : [CommentSchema], default: [] })
    commentRep: Comment[]
}

export const ReviewSchema = SchemaFactory.createForClass(Review);