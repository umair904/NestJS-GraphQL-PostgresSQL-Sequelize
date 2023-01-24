import { InputType, Field, Int} from '@nestjs/graphql'
import { Card } from 'src/card/card.model';
import { Order } from 'src/order/order.model';

@InputType()
export class AddUserArgs{

    @Field()
    fullName: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class UpdateUserArgs{

    @Field(()=> Int)
    id: number

    @Field({nullable:true})
    fullName: string;

    @Field({nullable:true})
    username: string;

    @Field({nullable:true})
    email: string;

    @Field({nullable:true})
    password: string;
}

@InputType()
export class AddCardToUser{
    
    @Field(()=> Int)
    userId: number

    @Field()
    card: Card

}

@InputType()
export class AddOrderToUser{

    @Field(()=> Int)
    userId: number

    @Field()
    order: Order
}