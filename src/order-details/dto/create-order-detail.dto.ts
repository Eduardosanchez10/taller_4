import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDetailDto {

    @IsString()
    @IsNotEmpty()
    order:string


    @IsString()
    @IsNotEmpty()
    product:string

    @IsNumber()
    @IsNotEmpty()
    cantidad:number
}
