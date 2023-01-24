import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { Card } from "../card/card.model";

@Table
@ObjectType()
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    @Field((type)=> Int, )
    id : number

    @Column
    @Field({nullable:true})
    fullName : string;

    @Column
    @Field({nullable:true})
    username : string;

    @Column
    @Field({nullable:true})
    email : string;

    @Column
    @Field({nullable:true})
    password : string;

    @Column
    @ForeignKey(()=> Card)
    @Field(()=> Int,{nullable:true})
    cardId: number

    @BelongsTo(()=> Card)
    @Field(()=> Card, {nullable:true})
    card: Card
    
    @HasMany(()=> Order)
    @Field(()=> [Order], {nullable:true})
    orders : Order[]

}