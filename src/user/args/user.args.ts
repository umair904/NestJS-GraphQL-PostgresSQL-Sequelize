import { InputType, Field, Int} from '@nestjs/graphql'

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

    @Field()
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