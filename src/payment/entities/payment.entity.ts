import { IsNotEmpty, IsString } from "class-validator";
import { join } from "path";
import { BaseEntity } from "../../common/config/base.entity";
import { PurchaseStatus } from "../../common/enums/purchaseStatus.enum";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";

@Entity('payment')
export class PaymentEntity  extends BaseEntity {
   @Column({type:"varchar"})
   method:string;

   @OneToMany(() => PurchaseEntity,(purchase)=> purchase.Payment)
   @JoinColumn({name:"Purchase_id"})
   purchase:string[];
 
}
