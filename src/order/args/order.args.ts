import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddOrderArgs {

    @Field(()=> Int)
    userId: number

    @Field(()=> Int)
    productId: number

    @Field(()=> Int)
    quantity: number

}