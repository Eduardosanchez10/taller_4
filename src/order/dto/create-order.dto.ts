import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsDate()
    @IsNotEmpty()
    date:Date

    @IsString()
    @IsNotEmpty()
    shipper: string;

    @IsString()
    @IsNotEmpty()
    customer: string;

    
    @IsString()
    @IsNotEmpty()
    employee: string;

    


}
