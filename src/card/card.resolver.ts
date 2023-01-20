import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddCardArgs } from './args/card.args';
import { Card } from './card.model';
import { CardService } from './card.service';

@Resolver()
export class CardResolver {

    constructor(private readonly cardService : CardService){}

    @Query(returns => [Card])
    getAllCards(){
        return this.cardService.getAllCards()
    }

    @Mutation(returns => String)
    createCard(@Args({name: "addCardArgs"}) addCardArgs : AddCardArgs){
        return this.cardService.createCard(addCardArgs)
    }

}
