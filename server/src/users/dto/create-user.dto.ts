import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {

    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    firstName : string;

    @IsString()
    @IsOptional()
    lastName : string;

    @IsString()
    @IsOptional()
    role : UserRole;

    @IsString()
    @IsOptional()
    password : string;

}