import { Resolver, Query, Int, Args, Mutation } from '@nestjs/graphql';
import { AddUserArgs, UpdateUserArgs } from './args/user.args';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService : UserService){}

    @Query(returns => [User],{name: 'GetAllUsers'})
    getAll(){
        return this.userService.findAll()
    }

    @Query(returns => User || String, {name: 'GetOneUser', nullable: true})
    getOne(@Args({name : 'UserId', type:()=> Int }) id: number){
        return this.userService.findOne(id)
    }

    @Mutation(returns => String , {name: 'CreateAUser'})
    createOne(@Args({name: 'createUserArgs'}) addUserArgs: AddUserArgs){
        return this.userService.addUser(addUserArgs)
    }

    @Mutation(returns => String , {name: 'updateAUser'})
    updateOne(@Args({name: 'updateUserArgs'}) updateUserArgs: UpdateUserArgs){
        return this.userService.updateUser(updateUserArgs)
    }

    @Mutation(returns=> String , {name:"DeleteUser"})
    deleteOne(@Args({name:"deleteUser", type:()=> Int})id:number){
        return this.userService.deleteUser(id)
    }
}
