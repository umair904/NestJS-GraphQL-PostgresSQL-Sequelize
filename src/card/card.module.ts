import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { Card } from './card.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';

@Module({
  imports:[SequelizeModule.forFeature([Card]), UserModule],
  providers: [CardService, CardResolver]
})
export class CardModule {}
