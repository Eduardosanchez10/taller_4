import { IsNotEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { PurchaseStatus } from "src/common/enums/purchaseStatus.enum";

export class CreatePurchaseDto {
    
    @IsNotEmpty()
    @IsEnum(PurchaseStatus)
    @IsOptional()
    status?: PurchaseStatus;

    @IsNotEmpty()
    @IsString()
    payment: string;
}
