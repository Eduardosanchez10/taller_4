import { PurchaseEntity } from "../entities/purchase.entity";

export interface ResponseAllpurchase{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: PurchaseEntity[];
}