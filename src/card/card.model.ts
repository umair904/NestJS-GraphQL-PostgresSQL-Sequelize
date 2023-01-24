import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../user/user.model";

@Table
@ObjectType()
export class Card extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    @Field((type)=> Int, )
    id : number

    @Column
    @Field()
    cardNumber : string;

    @Column
    @Field(()=> Int)
    cvv : number;

    @Column
    @Field()
    expireDate : Date;

    @Column
    @Field()
    type : string;

    @Column
    @ForeignKey(()=> User)
    @Field(()=> Int,{nullable:true})
    userId: number

    @BelongsTo(()=> User)
    user: User
}