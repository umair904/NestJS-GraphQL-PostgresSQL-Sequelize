import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderDetail } from "src/order-detail/order-detail.model";

@Table
@ObjectType()
export class Product extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    @Field((type)=> Int, )
    id : number

    @Column
    @Field()
    name : string;

    @Column
    @Field(()=> Int)
    price : number;

    @Column
    @Field()
    discription : string;

    @HasMany(()=> OrderDetail)
    orderDetails: OrderDetail[]
}