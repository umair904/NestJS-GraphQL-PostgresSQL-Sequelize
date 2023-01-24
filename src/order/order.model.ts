import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderDetail } from "src/order-detail/order-detail.model";
import { User } from "src/user/user.model";

@Table
@ObjectType()
export class Order extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    @Field((type)=> Int, )
    id : number

    @Column
    @Field()
    status : string;

    @Column
    @Field()
    orderDate : Date;

    @Column
    @ForeignKey(()=> User)
    @Field(()=> Int)
    userId: number

    @BelongsTo(()=> User)
    user: User

    @HasMany(()=> OrderDetail)
    @Field(()=> [OrderDetail],{nullable:true})
    details: OrderDetail[]

}