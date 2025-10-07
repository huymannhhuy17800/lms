import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CourseDataDto } from "./create-course.dto";

export class UpdateCourseDto {

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    desc : string;

    @IsNotEmpty()
    price: number

    @IsOptional()
    demoUrl: string

    @IsOptional()
    prerequisities: {title : string}[]

    @IsOptional()
    @ValidateNested({each : true})
    @Type(() => CourseDataDto)
    courseData: CourseDataDto[]
}
