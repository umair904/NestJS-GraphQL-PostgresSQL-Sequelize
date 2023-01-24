import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddOrderArgs } from './args/order.args';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService){}

    @Query(returns => [Order])
    getAllOrders(){
        return this.orderService.getAllOrders()
    }

    @Mutation(returns => String)
    placeOrder(@Args({name:"addOrderArgs"}) addOrderArgs: AddOrderArgs){
        return this.orderService.createOrder(addOrderArgs)
    }
}
