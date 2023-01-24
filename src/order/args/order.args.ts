import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddOrderArgs {

    @Field(()=> Int)
    userId: number

    @Field(()=> Int)
    productId: number

    @Field(()=> Int)
    quantity: number

    @Field(()=> Int, {nullable:true})
    orderId: number
}

@InputType()
export class DeleteOrderArgs{

    @Field(()=> Int)
    userId : number

    @Field(()=> Int)
    orderId: number
}

