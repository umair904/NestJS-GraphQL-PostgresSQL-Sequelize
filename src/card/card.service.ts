import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserService } from '../user/user.service';
import { AddCardArgs } from './args/card.args';
import { Card } from './card.model';

@Injectable()
export class CardService {
    constructor(@InjectModel(Card) private cardRepo:typeof Card, 
    private readonly userService : UserService
    ){}

    async createCard(addCardArgs : AddCardArgs) : Promise<string>{
        let user : User = await this.userService.findOne(addCardArgs.userId)
        if(!user){
            return 'No User found against this userID'
        }
        let card = {
        cardNumber : addCardArgs.cardNumber,
        cvv : addCardArgs.cvv,
        expireDate : addCardArgs.expireDate,
        type : addCardArgs.type,
        userId : user.id
        }
        let savedCard : Card = await this.cardRepo.create(card)
        return 'Card Has Been Created Successfully.'
    }

    async getAllCards() : Promise<Card[]> {
        return await this.cardRepo.findAll()
    }
}
