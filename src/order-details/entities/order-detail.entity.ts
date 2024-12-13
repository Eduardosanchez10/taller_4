import { Column, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/config/base.entity";
import { OrderEntity } from "../../order/entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";

export class DetailsEntity extends BaseEntity {
    
    @ManyToOne(()=> OrderEntity,  (order) => order.details)
    @JoinColumn({name:'order_id'})
    order:string

    @Column({type:'int'})
    cantidad:number

    @ManyToOne(()=> ProductEntity,  (product) => product.details)
    @JoinColumn({name:'order_id'})
    product:string

}
