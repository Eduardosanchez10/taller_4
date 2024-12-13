import { IsNotEmpty, IsString, isString } from "class-validator";

export class CreateShipperDto {

    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    phone:string;


}

