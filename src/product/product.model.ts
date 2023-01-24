import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, Column, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";

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

}