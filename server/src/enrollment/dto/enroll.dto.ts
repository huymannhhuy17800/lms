import { IsNotEmpty } from "class-validator";

export class EnrollDto {

    @IsNotEmpty()
    courseId: string;
}