import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Match } from "src/decorators/match.decorator";

export class RegisterDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Match('password')
  confirmPassword: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
