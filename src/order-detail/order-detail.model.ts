import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { Product } from "src/product/product.model";

@Table
@ObjectType()
export class OrderDetail extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    @Field((type)=> Int, )
    id : number

    @Column
    @Field(()=> Int)
    quantity : number;
    
    @Column
    @ForeignKey(()=> Product)
    @Field(()=> Int, {nullable:true})
    productId: number

    @Column
    @ForeignKey(()=> Order)
    @Field(()=> Int, {nullable:true})
    orderId: number

    @BelongsTo(()=> Order)
    order: Order

    @BelongsTo(()=> Product)
    @Field(()=> Product)
    product: Product
}