import { InputType, Field, Int} from '@nestjs/graphql'

@InputType()
export class AddCardArgs{

    @Field()
    cardNumber: string;

    @Field(()=> Int)
    cvv: number;

    @Field()
    expireDate: Date;

    @Field()
    type: string;

    @Field(()=> Int)
    userId: number;
}