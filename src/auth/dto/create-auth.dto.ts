import { IsEmail, isEmail, IsNotEmpty, IsString, isString } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
}
