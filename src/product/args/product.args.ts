import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddProductArgs {

    @Field()
    name: string

    @Field(()=> Int)
    price: number

    @Field()
    discription: string

}