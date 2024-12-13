import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/config/base.entity";
import { OrderEntity } from "../../order/entities/order.entity";
@Entity({name:"employee"})
export class EmployeeEntity extends BaseEntity {

    @Column({type:"varchar"})
    firstName: string;

    @Column({type:"varchar"})
    lastName: string;

    @Column({type:"date"})
    birth : Date;

    @Column({type:"varchar"})
    city: string;

    @Column({type:"varchar"})
    phone: string;

    @Column({type:"varchar"})
    note?: string;

    @OneToMany(()=> OrderEntity,(order) => order.employee)
    @JoinColumn({name:"order_id"})
    order:string

}
