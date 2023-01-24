import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderDetail } from 'src/order-detail/order-detail.model';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { AddOrderArgs, DeleteOrderArgs } from './args/order.args';
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
        if(addOrderArgs.orderId){
            let foundOrder = await this.orderRepo.findOne({where:{id: addOrderArgs.orderId , userId: addOrderArgs.userId}})
            if(!foundOrder){
                return "No order against provided Order ID or not associated to this User"
            }
            let foundDetail = await this.orderDetailRepo.findOne({where:{orderId: addOrderArgs.orderId , productId: addOrderArgs.productId}})
            if(foundDetail){
                foundDetail.quantity = addOrderArgs.quantity;
                await foundDetail.save()
                return "Order has been updated successfully"
            }
            await this.orderDetailRepo.create({quantity: addOrderArgs.quantity, orderId: addOrderArgs.orderId, productId: addOrderArgs.productId})
            return "Order has been updated successfully"
        }
        let order = {
            status: "Placed",
            orderDate: Date.now(),
            userId:addOrderArgs.userId
        }
        let orderSaved = await this.orderRepo.create(order)
        await this.orderDetailRepo.create({quantity: addOrderArgs.quantity, orderId: orderSaved.id, productId: addOrderArgs.productId})
        return 'Order placed successfully'
    }

    async deleteOrder(deleteOrderArgs: DeleteOrderArgs): Promise<string> {
        let orderValidate = await this.orderRepo.findOne({where:{id: deleteOrderArgs.orderId , userId: deleteOrderArgs.userId}})
        if(!orderValidate){
            return "Either order dosen't exist or client id trying to delete someone else's order"
        }
        // await this.orderDetailRepo.destroy({where:{orderId : deleteOrderArgs.orderId}})
        await this.orderRepo.destroy({where:{id: deleteOrderArgs.orderId}})
        return "Order has been removed successfully"
    }

}
