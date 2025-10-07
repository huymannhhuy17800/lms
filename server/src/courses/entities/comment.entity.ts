import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CommentDocument = Comment & Document;

@Schema({timestamps : true})
export class Comment{

    @Prop({ type : Object })
    user: object;

    @Prop()
    comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);