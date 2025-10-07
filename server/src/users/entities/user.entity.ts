/* eslint-disable */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

export enum UserRole {
    ADMIN = 'admin',
    STUDENT = 'student',
    INSTRUCTOR = 'instructor',
}

@Schema({ timestamps: true , collection: 'users' })
export class User {

    @Prop({ unique: true , required: true})
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: UserRole.STUDENT, enum: UserRole })
    role: UserRole;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    dob?: number;

    @Prop()
    isAdmin: boolean;

    @Prop()
    avatar?: string;

    @Prop()
    courses?: Array<{courseId : string}>
}

export const UserSchema = SchemaFactory.createForClass(User);