import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { AddOrderArgs } from './args/order.args';
import { Order } from './order.model';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepo: typeof Order,
    private readonly userService : UserService
    ){}

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepo.findAll()
    }

    async findAnOrder(id: number): Promise<Order> {
        let foundOrder = await this.orderRepo.findOne({where:{id}})
        if(foundOrder){
            return foundOrder
        }
    }

    async createOrder(addOrderArgs: AddOrderArgs): Promise<string> {
        let user : User = await this.userService.findOne(addOrderArgs.userId)
        if(!user){
            return "No User Found"
        }
        let order = {
            status: "Placed",
            orderDate: "2021-07-06 07:55:33",
            user,
            userId:addOrderArgs.userId
        }
        let orderSaved = await this.orderRepo.create(order)
        await this.userService.addOrderToUser({userId:addOrderArgs.userId, order: orderSaved})
        return 'Order placed successfully'
    }
}
