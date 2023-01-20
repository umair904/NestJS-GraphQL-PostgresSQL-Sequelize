import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from 'src/card/card.model';
import { AddCardToUser, AddUserArgs, UpdateUserArgs } from './args/user.args';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepo:typeof User){}

    async findAll(): Promise<User[]> {
        return await this.userRepo.findAll()
    }

    async findOne(id:number) : Promise<User> {
        let user = await this.userRepo.findOne({where:{id}, include:[Card]})
        if(user){
            return user
        }
    }

    async deleteUser(id: number) : Promise<string> {
        await this.userRepo.destroy({where:{id}})
        return 'User deleted successfully'
    }

    async updateUser(userArgs: UpdateUserArgs) : Promise<string> {
        let user : User = await this.userRepo.findOne({where:{id:userArgs.id}})
        user.fullName = userArgs.fullName;
        user.username = userArgs.username;
        user.email = userArgs.email;
        user.password = userArgs.password;
        await user.save()
        return 'User updated successfully'
    }

    async addUser(userArgs: AddUserArgs) : Promise<string> {
        let user : User = new User();
        user.fullName = userArgs.fullName;
        user.username = userArgs.username;
        user.email = userArgs.email;
        user.password = userArgs.password;
        await user.save()
        return 'User created successfully'
    }

    async addCardToUser(addCardToUser : AddCardToUser): Promise<string> {
        let user : User = await this.findOne(addCardToUser.userId)
        if(!user){
            return 'No user found against this userID'
        }
        user.card = addCardToUser.card;
        user.cardId = addCardToUser.card.id;
        await user.save()
        return "Card added to user successfully"
    }
}
