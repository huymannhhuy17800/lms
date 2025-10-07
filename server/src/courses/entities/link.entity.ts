import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type LinkDocument = Link & Document;

@Schema({timestamps : true})
export class Link {

    @Prop()
    title : string

    @Prop()
    url : string
}

export const LinkSchema = SchemaFactory.createForClass(Link);