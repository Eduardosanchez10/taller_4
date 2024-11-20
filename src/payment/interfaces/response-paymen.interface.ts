import { PaymentEntity } from "../entities/payment.entity";

export interface ResponseAllpayments{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: PaymentEntity[];
}