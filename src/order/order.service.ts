import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderDetail } from 'src/order-detail/order-detail.model';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { AddOrderArgs } from './args/order.args';
import { Order } from './order.model';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepo: typeof Order,
    @InjectModel(OrderDetail) private orderDetailRepo:typeof OrderDetail,
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
            userId:addOrderArgs.userId
        }
        let orderSaved = await this.orderRepo.create(order)
        let details = await this.orderDetailRepo.create({quantity: addOrderArgs.quantity, orderId: orderSaved.id, productId: addOrderArgs.productId})
        console.log(details)
        return 'Order placed successfully'
    }
}
