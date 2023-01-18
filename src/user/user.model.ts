import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Model, Table } from "sequelize-typescript";

@Table
@ObjectType()
export class User extends Model {

    @Column({primaryKey: true, autoIncrement: true})
    @Field((type)=> Int, {nullable:true})
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
}