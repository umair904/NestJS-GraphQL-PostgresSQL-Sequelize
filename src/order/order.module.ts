import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from './order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[SequelizeModule.forFeature([Order]), UserModule],
  providers: [OrderService, OrderResolver]
})
export class OrderModule {}
