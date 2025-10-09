import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {

    @IsNumber()
    @IsNotEmpty()
    rating : number;

    @IsString()
    comment: string;

}