import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { GENDER } from "src/common/enums/gender.enum";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsOptional()
    @IsString()
    photo: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsEnum(GENDER)
    gender: GENDER;
}