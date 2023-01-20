import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
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

    @HasOne(()=> User)
    user : User
}