import { IsMongoId, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateCourseDto {
    
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

    @IsMongoId()
    instructor: string;
}

export class CourseDataDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    desc: string;

    @IsNotEmpty()
    videoUrl: string;

    @IsOptional()
    videoThumbnail: string;

     @IsNotEmpty()
    videoSection: string;

    @IsOptional()
    videoLength: number;

    @IsOptional()
    @ValidateNested({each : true})
    @Type(() => LinkDto)
    links: LinkDto[];

    @IsOptional()
    @ValidateNested({each : true})
    @Type(() => ReviewDto)
    reviews: ReviewDto[];
}

export class LinkDto {

    title: string;

    url: string;
}

export class ReviewDto {

    @IsOptional()
    user : object;

    rating: number;

    comment: string;
}