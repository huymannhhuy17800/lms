import { IsOptional, IsString } from "class-validator";
import { Match } from "src/decorators/match.decorator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    firstName : string;

    @IsString()
    @IsOptional()
    lastName : string;

    @IsString()
    @IsOptional()
    role : string;

    @IsString()
    @IsOptional()
    password : string;

    @IsString()
    @IsOptional()
    @Match('password')
    confirmPassword : string;
}