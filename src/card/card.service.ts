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
        let card : Card = new Card();
        card.cardNumber = addCardArgs.cardNumber;
        card.cvv = addCardArgs.cvv;
        card.expireDate = addCardArgs.expireDate;
        card.type = addCardArgs.type;
        card.user = user;
        card.save()
        await this.userService.addCardToUser({userId: user.id , card})
        return 'Card Has Been Created Successfully.'
    }

    async getAllCards() : Promise<Card[]> {
        return await this.cardRepo.findAll()
    }
}
