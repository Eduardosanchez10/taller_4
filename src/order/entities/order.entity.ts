import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/config/base.entity";
import { CustomerEntity } from "../../customers/entities/customer.entity";
import { ShipperEntity } from "../../shipper/entities/shipper.entity";
import { EmployeeEntity } from "../../employee/entities/employee.entity";
import { DetailsEntity } from "../../order-details/entities/order-detail.entity";
@Entity("order")
export class OrderEntity extends BaseEntity {

    @Column({type: 'date'})
    date:Date;

    @ManyToOne(() => CustomerEntity, (customer) => customer.order)
    @JoinColumn({name:"customer_id"})
    customer: string;

    @ManyToOne(()=> ShipperEntity, (shipper)=> shipper.order)
    @JoinColumn({name:"shipper_id"})
    shipper:string

    @ManyToOne(()=> EmployeeEntity,(employee)=> employee.order)
    @JoinColumn({name:"employee_id"})
    employee:string
    @OneToMany(()=> DetailsEntity , (details)=> details.order)
    @JoinColumn({name:"orderDetails_id"})
    details:string


}
