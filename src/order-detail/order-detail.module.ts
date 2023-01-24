import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderDetail } from './order-detail.model';

@Module({
    imports:[SequelizeModule.forFeature([OrderDetail])]
})
export class OrderDetailModule {}
