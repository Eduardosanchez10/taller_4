import { BaseEntity } from "../../common/config/base.entity";
import { PurchaseStatus } from "../../common/enums/purchaseStatus.enum";
import {  PaymentEntity } from "../../payment/entities/payment.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('purchase')
export class PurchaseEntity extends BaseEntity {
    @Column({type:'enum',enum:PurchaseStatus,default:PurchaseStatus.PENDIG_APPROVAL})
    status?:PurchaseStatus;
    
    @ManyToOne(()  => PaymentEntity,(Payment)=> Payment.method)
    @JoinColumn({name:'payment_id'})
    Payment:string
}
